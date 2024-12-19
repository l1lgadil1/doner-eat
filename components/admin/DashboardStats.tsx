import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Ban 
} from "lucide-react";

interface DashboardStatsProps {
  orders: Order[];
}

export function DashboardStats({ orders }: DashboardStatsProps) {
  const stats = [
    {
      title: "Всего заказов",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Выполнено",
      value: orders.filter(order => order.status === "COMPLETED").length,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "В процессе",
      value: orders.filter(order => ["PENDING", "CONFIRMED", "PREPARING", "READY"].includes(order.status)).length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Отменено",
      value: orders.filter(order => order.status === "CANCELLED").length,
      icon: Ban,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const totalRevenue = orders
    .filter(order => order.status === "COMPLETED")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center space-x-4">
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
      <Card className="p-6 col-span-full">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">Общая выручка</p>
          <p className="text-2xl font-bold text-[#182da8]">{totalRevenue.toLocaleString()} ₸</p>
        </div>
      </Card>
    </div>
  );
} 