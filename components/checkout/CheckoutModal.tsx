"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import { CartItem } from "@/types/cart";
import { useCheckout } from "@/hooks/use-checkout";
import { useCheckoutValidation } from "@/hooks/use-checkout-validation";
import { useRouter } from "next/navigation";
import { ordersApi } from "@/lib/api/orders";
import { toast } from "react-hot-toast";

const LAST_ORDER_KEY = 'lastOrderId';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItem | null;
}

export function CheckoutModal({ isOpen, onClose, item }: CheckoutModalProps) {
  const router = useRouter();
  const {
    quantity,
    setQuantity,
    formData,
    handleInputChange,
    submitOrder,
    isSubmitting
  } = useCheckout(item, onClose);

  const { errors, validateForm, clearErrors } = useCheckoutValidation();

  if (!item) return null;

  const total = parseFloat(item.price.replace('₸', '')) * quantity;

  const handleClose = () => {
    clearErrors();
    onClose();
  };

  const handleSubmit = async () => {
    if (validateForm(formData.customerName, formData.phoneNumber)) {
      try {
        const order = await submitOrder();
        if (order) {
          localStorage.setItem(LAST_ORDER_KEY, order.id.toString());
          router.push(`/orders/${order.id}`);
        }
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось создать заказ. Пожалуйста, попробуйте снова.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Детали заказа</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-[#182da8] font-bold">{item.price}</p>
            </div>

            <p className="text-gray-600">{item.description}</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  name="customerName"
                  placeholder="Ваше имя"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={errors.customerName ? "border-red-500" : ""}
                />
                {errors.customerName && (
                  <p className="text-sm text-red-500">{errors.customerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  name="phoneNumber"
                  placeholder="Номер телефона (+7)"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isSubmitting}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xl font-bold">{total.toFixed(2)} ₸</p>
            </div>
          </div>

          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full bg-[#182da8] text-white" 
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? 'Оформление...' : 'Добавить в корзину'}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}