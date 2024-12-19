import { OrderClient } from "@/components/orders/OrderClient";

// Force Next.js to render this page on the server at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function OrderPage({ params }: { params: { id: string } }) {
  return <OrderClient orderId={params.id} />;
} 