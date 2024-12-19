export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  menuItemId: string;
  orderId: string;
  menuItem: MenuItem;
}

export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'doner' | 'durum' | 'sides';
  isAvailable?: boolean;
} 