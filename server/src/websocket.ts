import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

interface OrderUpdate {
  orderId: string;
  status: string;
  timestamp: string;
}

class WebSocketService {
  private wss: WebSocketServer;
  private orderSubscriptions: Map<string, Set<WebSocket>> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server });
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws) => {
      ws.on('message', (message: string) => {
        const data = JSON.parse(message);
        if (data.type === 'subscribe' && data.orderId) {
          this.subscribeToOrder(data.orderId, ws);
        }
      });

      ws.on('close', () => {
        this.removeSubscriber(ws);
      });
    });
  }

  private subscribeToOrder(orderId: string, ws: WebSocket) {
    if (!this.orderSubscriptions.has(orderId)) {
      this.orderSubscriptions.set(orderId, new Set());
    }
    this.orderSubscriptions.get(orderId)?.add(ws);
  }

  private removeSubscriber(ws: WebSocket) {
    this.orderSubscriptions.forEach((subscribers) => {
      subscribers.delete(ws);
    });
  }

  public notifyOrderUpdate(update: OrderUpdate) {
    const subscribers = this.orderSubscriptions.get(update.orderId);
    if (subscribers) {
      const message = JSON.stringify({
        type: 'orderUpdate',
        data: update
      });
      subscribers.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
      });
    }
  }
}

export default WebSocketService; 