import axios from 'axios';

const API_URL = 'http://localhost:3001';

interface CreateOrderData {
  customerName: string;
  phoneNumber: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
}

export const ordersApi = {
  createOrder: async (data: CreateOrderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Order creation error:', error.response?.data);
        throw new Error(error.response?.data?.error || 'Failed to create order');
      }
      throw error;
    }
  },

  getOrderStatus: async (orderId: string) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Get order error:', error.response?.data);
        throw new Error(error.response?.data?.error || 'Failed to fetch order');
      }
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const response = await axios.patch(`${API_URL}/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }
}; 