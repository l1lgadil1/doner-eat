import { Card } from "@/components/ui/card";

interface OrderErrorProps {
  message: string;
}

export function OrderError({ message }: OrderErrorProps) {
  return (
    <Card className="p-6 text-center">
      <p className="text-red-500 mb-2">{message}</p>
      <p className="text-gray-500">Перенаправление на главную страницу...</p>
    </Card>
  );
} 