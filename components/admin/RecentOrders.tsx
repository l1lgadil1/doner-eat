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
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const router = useRouter();
  return (
    <Card className="overflow-hidden">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="min-w-[150px]">Клиент</TableHead>
              <TableHead className="hidden md:table-cell">Телефон</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
              <TableHead className="hidden sm:table-cell">Статус</TableHead>
              <TableHead className="hidden lg:table-cell text-right">Дата</TableHead>
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
                  className="cursor-pointer hover:bg-muted/50 transition-colors group"
                  tabIndex={0}
                  role="link"
                  onClick={() => {
                    router.push(`/admin/orders/${order.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.location.href = `/admin/orders/${order.id}`;
                    }
                  }}
                >
                  <TableCell className="font-medium">
                    #{order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-sm text-muted-foreground md:hidden">
                        {order.phoneNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.phoneNumber}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.totalAmount)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    <div className="flex flex-col items-end">
                      <span>
                        {format(new Date(order.createdAt), 'dd MMM yyyy', { locale: ru })}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(order.createdAt), 'HH:mm')}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
} 