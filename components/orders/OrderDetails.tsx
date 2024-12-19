import { Order } from "@/types/order";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { Card } from "@/components/ui/card";

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Отслеживание заказа</h1>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Номер заказа:</span>
          <span className="font-medium truncate" title={order.id}>{order.id}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Статус:</span>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold mb-3">Состав заказа:</h2>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.menuItem.name} × {item.quantity}</span>
                <span className="font-medium">
                  {(item.menuItem.price * item.quantity).toLocaleString()} ₸
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-semibold">Итого:</span>
          <span className="font-bold text-lg">
            {order.totalAmount.toLocaleString()} ₸
          </span>
        </div>
      </div>
    </Card>
  );
} 