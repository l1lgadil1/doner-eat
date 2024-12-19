import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { ordersApi } from '@/lib/api/orders';
import { useToast } from '@/hooks/use-toast';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const data = await ordersApi.getOrders();
      setOrders(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch orders');
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заказы",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await ordersApi.updateOrderStatus(orderId, status);
      await fetchOrders(); // Refresh orders
      toast({
        title: "Успешно",
        description: "Статус заказа обновлен",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус заказа",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
    refreshOrders: fetchOrders
  };
}; 