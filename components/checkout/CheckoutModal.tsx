"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Heart, X, Plus, Minus, Loader2 } from "lucide-react";
import { CartItem } from "@/types/cart";
import { useCheckout } from "@/hooks/use-checkout";
import { useCheckoutValidation } from "@/hooks/use-checkout-validation";
import { useRouter } from "next/navigation";
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
        toast.error("Не удалось создать заказ. Пожалуйста, попробуйте снова.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-y-scroll max-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        {/* Top Action Buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          {/* <Button variant="ghost" size="default" className="rounded-full bg-gray-800/50 hover:bg-gray-800/70">
            <Heart className="h-5 w-5 text-white" />
          </Button> */}
          <Button variant="ghost" size="default" className="rounded-full bg-gray-800/50 hover:bg-gray-800/70" onClick={handleClose}>
            <X className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-full">
          {/* Product Image */}
          <div className="relative w-full h-72">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="px-6 py-4 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>
              <p className="text-gray-400 mt-1">Настройте ваш заказ</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex justify-center items-center py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="default"
                  className="rounded-full bg-gray-800 hover:bg-gray-700 text-white"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isSubmitting}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold text-white min-w-[40px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="default"
                  className="rounded-full bg-gray-800 hover:bg-gray-700 text-white"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 gap-4 py-4 border-t border-gray-800">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Примерное время приготовления</p>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white font-semibold">15-20 минут</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-400 text-sm text-center">
              {item.description}
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <Input
                name="customerName"
                placeholder="Ваше имя"
                value={formData.customerName}
                onChange={handleInputChange}
                className={`bg-gray-800 border-gray-700 text-white ${errors.customerName ? "border-red-500" : ""}`}
              />
              {errors.customerName && (
                <p className="text-sm text-red-500">{errors.customerName}</p>
              )}
              <Input
                name="phoneNumber"
                placeholder="Номер телефона (+7)"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`bg-gray-800 border-gray-700 text-white ${errors.phoneNumber ? "border-red-500" : ""}`}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Order Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Оформление...
                  </>
                ) : (
                  <>+ {total.toFixed(2)} ₸</>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}