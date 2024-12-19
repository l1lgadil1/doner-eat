import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import WebSocketService from '../websocket';

const prisma = new PrismaClient();
const router = Router();

let wsService: WebSocketService;

export const setWebSocketService = (service: WebSocketService) => {
  wsService = service;
};

// Schema validation
const OrderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().int().positive()
});

const CreateOrderSchema = z.object({
  customerName: z.string().min(1),
  phoneNumber: z.string().regex(/^\+?7\d{10}$/),
  items: z.array(OrderItemSchema).min(1)
});

const UpdateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'])
});

// Create order
router.post("/", async (req, res) => {
  try {
    console.log('Received order data:', req.body); // Debug log

    const data = CreateOrderSchema.parse(req.body);
    
    // First, verify all menu items exist
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: data.items.map(item => item.menuItemId) }
      }
    });

    if (menuItems.length !== data.items.length) {
      return res.status(400).json({ 
        error: "One or more menu items not found" 
      });
    }
    
    // Calculate total amount
    const totalAmount = data.items.reduce((sum, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      return sum + (menuItem ? parseFloat(menuItem.price) * item.quantity : 0);
    }, 0);

    // Create the order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order first
      const newOrder = await tx.order.create({
        data: {
          customerName: data.customerName,
          phoneNumber: data.phoneNumber,
          status: "PENDING",
          totalAmount,
          items: {
            create: data.items.map(item => ({
              quantity: item.quantity,
              menuItem: { connect: { id: item.menuItemId } }
            }))
          }
        },
        include: {
          items: {
            include: {
              menuItem: true
            }
          }
        }
      });

      return newOrder;
    });

    console.log('Created order:', order); // Debug log
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error); // Debug log
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid order data", 
        details: error.errors 
      });
    }

    res.status(500).json({ 
      error: "Failed to create order",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all orders (admin only)
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get single order
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Update order status (admin only)
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = UpdateOrderStatusSchema.parse(req.body);
    
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });
    
    // Notify WebSocket subscribers
    wsService.notifyOrderUpdate({
      orderId: id,
      status,
      timestamp: new Date().toISOString()
    });
    
    res.json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// Cancel order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

export default router; 