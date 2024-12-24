import { OrderStatus } from "@/types/order";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderStatusButtonsProps {
  currentStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  isUpdating: boolean;
}

const ORDER_STATUSES = [
  { 
    value: 'PENDING',
    label: 'В ожидании',
    activeColor: 'bg-yellow-500 hover:bg-yellow-600'
  },
  { 
    value: 'CONFIRMED',
    label: 'Подтвержден',
    activeColor: 'bg-blue-500 hover:bg-blue-600'
  },
  { 
    value: 'PREPARING',
    label: 'Готовится',
    activeColor: 'bg-purple-500 hover:bg-purple-600'
  },
  { 
    value: 'READY',
    label: 'Готов',
    activeColor: 'bg-green-500 hover:bg-green-600'
  },
  { 
    value: 'COMPLETED',
    label: 'Завершен',
    activeColor: 'bg-gray-500 hover:bg-gray-600'
  },
  { 
    value: 'CANCELLED',
    label: 'Отменен',
    activeColor: 'bg-red-500 hover:bg-red-600'
  },
] as const;

export function OrderStatusButtons({ currentStatus, onStatusChange, isUpdating }: OrderStatusButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ORDER_STATUSES.map((status) => {
        const isActive = currentStatus === status.value;
        return (
          <Button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            disabled={isUpdating}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "min-w-[120px]",
              isActive && cn(status.activeColor, "text-white border-transparent"),
              !isActive && "hover:bg-gray-100"
            )}
          >
            {status.label}
          </Button>
        );
      })}
    </div>
  );
} 