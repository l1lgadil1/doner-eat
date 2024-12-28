import express from "express";
import http from 'http';
import cors from "cors";
import menuRouter from "./routes/menu";
import orderRouter, { setWebSocketService } from "./routes/orders";
import WebSocketService from "./websocket";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// Initialize WebSocket service
const wsService = new WebSocketService(server);
setWebSocketService(wsService);

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());

// Handle main route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Doner API",
    endpoints: {
      menu: {
        GET: "/menu - Get all menu items",
        POST: "/menu - Create new menu item (admin)",
        PUT: "/menu/:id - Update menu item (admin)"
      },
      orders: {
        POST: "/orders - Create new order",
        GET: "/orders/:id - Get order details"
      }
    }
  });
});

// Add this new route near the main route
app.get("/health", async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get counts
    const menuCount = await prisma.menuItem.count();
    const orderCount = await prisma.order.count();
    
    res.json({
      status: "healthy",
      database: "connected",
      counts: {
        menuItems: menuCount,
        orders: orderCount
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: "unhealthy",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.use("/menu", menuRouter);
app.use("/orders", orderRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Add this before starting the server
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
    
    // Check if menu items exist
    const menuCount = await prisma.menuItem.count();
    console.log(`Found ${menuCount} menu items in database`);
    
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

checkDatabaseConnection().then(() => {
  server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}).catch(error => {
  console.error('Server startup failed:', error);
  process.exit(1);
});

export default app;
