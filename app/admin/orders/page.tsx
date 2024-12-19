"use client";

import { useEffect, useState } from "react";
import { useOrders } from "@/hooks/use-orders";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#182da8]" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
} 