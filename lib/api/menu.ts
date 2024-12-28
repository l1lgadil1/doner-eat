import axios from 'axios';
import { CartItem } from '@/types/cart';
import { MenuItem } from '@/types/order';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const menuApi = {
  getMenuItems: async (): Promise<CartItem[]> => {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      return response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        image: item.image,
        category: item.category
      }));
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      throw error;
    }
  },

  createMenuItem: async (data: Partial<MenuItem>) => {
    try {
      const response = await axios.post(`${API_URL}/menu`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to create menu item:', error);
      throw error;
    }
  },

  updateMenuItem: async (id: string, data: Partial<MenuItem>) => {
    try {
      const response = await axios.put(`${API_URL}/menu/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update menu item:', error);
      throw error;
    }
  },

  deleteMenuItem: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/menu/${id}`);
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      throw error;
    }
  }
}; 