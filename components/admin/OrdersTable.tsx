import { useRouter } from "next/navigation";
import { Order } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .sort((a, b) => {
              const statusOrder = {
                'PENDING': 0,
                'PROCESSING': 1,
                'READY': 2, 
                'COMPLETED': 3,
                'CANCELLED': 4
              };
              
              const statusDiff = statusOrder[a.status] - statusOrder[b.status];
              if (statusDiff !== 0) return statusDiff;
              
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .map((order) => (
              <TableRow 
                key={order.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleViewOrder(order.id)}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.phoneNumber}</TableCell>
                <TableCell>
                  {order.items.map((item) => (
                    <div key={item.id} className="text-sm">
                      {item.menuItem.name} × {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.totalAmount} ₸</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewOrder(order.id);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
} 