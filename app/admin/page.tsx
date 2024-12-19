"use client";

import { useOrders } from "@/hooks/use-orders";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default function AdminPage() {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#182da8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Ошибка при загрузке данных
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Панель управления</h1>
      
      <DashboardStats orders={orders} />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Последние заказы</h2>
        <RecentOrders orders={orders.slice(0, 5)} />
      </div>
    </div>
  );
} 