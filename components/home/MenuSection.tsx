"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import { MenuItem } from "@/types/menu";
import { menuItemToCartItem } from "@/types/menu";

export function MenuSection() {
  const {
    menuItems,
    isLoading,
    error,
    selectedItem,
    isModalOpen,
    handleOrderClick,
    handleCloseModal
  } = useMenu();

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#182da8]" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50" id="menu">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">Наше Меню</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Попробуйте аутентичные турецкие вкусы с нашей коллекцией свежеприготовленных донеров
          </p>
        </FadeInWhenVisible>
        
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : menuItems.length === 0 ? (
          <p className="text-center text-gray-500">Меню временно недоступно</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                onOrder={handleOrderClick} 
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedItem && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={menuItemToCartItem(selectedItem)}
        />
      )}
    </section>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  onOrder: (item: MenuItem) => void;
}

function MenuItemCard({ item, onOrder }: MenuItemCardProps) {
  return (
    <FadeInWhenVisible>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          <div className="relative h-48">
            <img
              src={item.image || '/placeholder-food.jpg'}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <Button
                onClick={() => onOrder(item)}
                className="bg-white text-[#182da8] hover:bg-white/90"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Заказать
              </Button>
            </motion.div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-[#182da8] font-bold text-lg">{item.price} ₸</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOrder(item)}
                className="text-[#182da8] hover:bg-[#182da8]/10"
              >
                Добавить в корзину
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </FadeInWhenVisible>
  );
}