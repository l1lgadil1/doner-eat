import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/types/order";
import { ordersApi } from "@/lib/api/orders";

interface UseOrderTrackingProps {
  orderId: string;
}

interface UseOrderTrackingReturn {
  order: Order | null;
  error: string | null;
  isLoading: boolean;
}

export const useOrderTracking = ({ orderId }: UseOrderTrackingProps): UseOrderTrackingReturn => {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ws: WebSocket;

    const fetchOrder = async () => {
      try {
        const data = await ordersApi.getOrderStatus(orderId);
        setOrder(data);
        setError(null);
      } catch (error) {
        setError("Заказ не найден");
        setTimeout(() => router.push("/"), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    const connectWebSocket = () => {
      ws = new WebSocket(`ws://localhost:3001`);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          orderId
        }));
      };

      ws.onmessage = (event) => {
        const update = JSON.parse(event.data);
        if (update.type === 'orderUpdate') {
          setOrder(prev => prev ? { ...prev, status: update.data.status } : null);
        }
      };

      ws.onerror = () => {
        console.error('WebSocket error');
        setError("Ошибка подключения");
      };
    };

    fetchOrder();
    connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, [orderId, router]);

  return {
    order,
    error,
    isLoading
  };
}; 