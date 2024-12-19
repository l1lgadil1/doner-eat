"use client";

import { useOrderTracking } from "@/hooks/use-order-tracking";
import { OrderDetails } from "@/components/orders/OrderDetails";
import { OrderError } from "@/components/orders/OrderError";
import { Loader2 } from "lucide-react";

interface OrderClientProps {
  orderId: string;
}

export function OrderClient({ orderId }: OrderClientProps) {
  const { order, error, isLoading } = useOrderTracking({ orderId });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#182da8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OrderError message={error} />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50  py-[100px]">
      <div className="container mx-auto px-4 ">
        <OrderDetails order={order} />
      </div>
    </div>
  );
} 