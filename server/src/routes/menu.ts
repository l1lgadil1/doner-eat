import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

// Schema validation
const MenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  image: z.string().optional(),
  category: z.enum(["doner", "durum", "sides"], {
    required_error: "Category is required",
    invalid_type_error: "Category must be either 'doner', 'durum', or 'sides'",
  }),
  isAvailable: z.boolean().default(true)
});

// Get all menu items
router.get("/", async (req, res) => {
  try {
    console.log('Fetching menu items...');
    
    // First check if any items exist at all
    const totalCount = await prisma.menuItem.count();
    console.log(`Total menu items in database: ${totalCount}`);

    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
      // Remove the where clause to see all items first
    });
    
    console.log(`Found ${menuItems.length} menu items`);

    // If no items at all, suggest running seed
    if (totalCount === 0) {
      console.log('No menu items found in database. Database may need seeding.');
      return res.status(404).json({ 
        message: "No menu items found. Please run database seed.",
        code: "NO_MENU_ITEMS"
      });
    }

    // If we have items but none are available
    if (menuItems.length === 0) {
      console.log('Menu items exist but none are available');
      return res.status(404).json({ 
        message: "No menu items currently available",
        code: "NO_AVAILABLE_ITEMS" 
      });
    }

    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ 
      error: "Failed to fetch menu items",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get single menu item
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id }
    });
    
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
});

// Create menu item (admin only)
router.post("/", async (req, res) => {
  try {
    console.log('Received menu item data:', req.body); // Debug log

    const validatedData = MenuItemSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: validatedData.error.errors 
      });
    }

    const menuItem = await prisma.menuItem.create({
      data: validatedData.data
    });

    console.log('Created menu item:', menuItem); // Debug log
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Menu item creation error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid menu item data", 
        details: error.errors 
      });
    }

    res.status(500).json({ 
      error: "Failed to create menu item",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update menu item (admin only)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = MenuItemSchema.partial().parse(req.body);
    
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data
    });
    
    res.json(menuItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

// Delete menu item (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menuItem.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

export default router; 