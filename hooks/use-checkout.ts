import { useState } from 'react';
import { ordersApi } from '@/lib/api/orders';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types/cart';

interface CheckoutFormData {
  customerName: string;
  phoneNumber: string;
}

export const useCheckout = (item: CartItem | null, onClose: () => void) => {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return false;
    }

    const phoneRegex = /^\+?7\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный номер телефона в формате +7XXXXXXXXXX",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const submitOrder = async () => {
    if (!item) return null;

    try {
      const order = await ordersApi.createOrder({
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        items: [{
          menuItemId: item.id,
          quantity: quantity
        }]
      });

      toast({
        title: "Заказ принят!",
        description: `Номер вашего заказа: ${order.id}`,
      });

      onClose();
      return order;
    } catch (error) {
      throw error;
    }
  };

  return {
    quantity,
    setQuantity,
    formData,
    handleInputChange,
    submitOrder,
    isSubmitting
  };
}; 