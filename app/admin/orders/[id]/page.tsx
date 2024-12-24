"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Order, OrderStatus } from "@/types/order";
import { ordersApi } from "@/lib/api/orders";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusButtons } from "@/components/orders/OrderStatusButtons";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await ordersApi.getOrderStatus(params.id as string);
        setOrder(data);
      } catch (error) {
        toast.error("Не удалось загрузить детали заказа");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    
    setIsUpdating(true);
    try {
      await ordersApi.updateOrderStatus(order.id, newStatus);
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success("Статус заказа успешно обновлен");
    } catch (error) {
      toast.error("Не удалось обновить статус заказа");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#182da8]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Заказ не найден</h1>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к заказам
        </Button>
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к заказам
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Статус:</span>
          <OrderStatusButtons
            currentStatus={order.status}
            onStatusChange={handleStatusChange}
            isUpdating={isUpdating}
          />
        </div>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Детали заказа</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Номер заказа:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Имя клиента:</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Номер телефона:</span>
                <span className="font-medium">{order.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Дата создания:</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Состав заказа</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{item.menuItem.price * item.quantity} ₸</p>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Итоговая сумма:</span>
                  <span className="font-bold text-lg">{order.totalAmount} ₸</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}