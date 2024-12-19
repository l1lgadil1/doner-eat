import { OrderStatus } from "@/types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: {
    label: "В ожидании",
    className: "bg-yellow-100 text-yellow-800"
  },
  CONFIRMED: {
    label: "Подтвержден",
    className: "bg-blue-100 text-blue-800"
  },
  PREPARING: {
    label: "Готовится",
    className: "bg-purple-100 text-purple-800"
  },
  READY: {
    label: "Готов",
    className: "bg-green-100 text-green-800"
  },
  COMPLETED: {
    label: "Завершен",
    className: "bg-gray-100 text-gray-800"
  },
  CANCELLED: {
    label: "Отменен",
    className: "bg-red-100 text-red-800"
  }
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}; 