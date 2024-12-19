"use client";

import { Card } from "@/components/ui/card";
import { Utensils, Timer, Award, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";

const features = [
  {
    icon: Utensils,
    title: "Свежие Ингредиенты",
    description: "Мясо премиум качества и свежие овощи каждый день"
  },
  {
    icon: Timer,
    title: "Быстрое Обслуживание",
    description: "Наш вкусный алматинский донер будет готов через уже несколько минут !"
  },
  {
    icon: Award,
    title: "Аутентичный Рецепт",
    description: "Традиционная алматинская техника приготовления донера"
  },
  {
    icon: Truck,
    title: "Быстрая Доставка",
    description: "Доставим горячим прямо к вашей двери"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Почему Выбирают Нас?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeInWhenVisible key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 text-center transform transition-all duration-300 hover:shadow-xl bg-white border-none">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="bg-[#182da8]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <feature.icon className="w-8 h-8 text-[#182da8]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}