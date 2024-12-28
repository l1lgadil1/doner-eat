"use client";

import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { UtensilsCrossed, Beef, ThumbsUp } from "lucide-react";

const qualities = [
  {
    icon: Beef,
    title: "Премиальное Мясо",
    description: "100% халяльное сертифицированное мясо"
  },
  {
    icon: UtensilsCrossed,
    title: "Традиционный Рецепт",
    description: "Аутентичная смесь специй"
  },
  {
    icon: ThumbsUp,
    title: "Гарантия Качества",
    description: "Свежие ингредиенты каждый день"
  }
];

export function QualitySection() {
  return (
    <Parallax
      blur={0}
      bgImage="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=3569&auto=format&fit=crop"
      strength={200}
      className="py-24"
      bgImageStyle={{
        objectFit: 'cover',
        objectPosition: 'center 40%',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
              Качество в Каждом Кусочке
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {qualities.map((quality, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="bg-[#182da8]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <quality.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{quality.title}</h3>
                  <p className="text-gray-300">{quality.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Наше стремление к качеству начинается с выбора лучших сортов мяса,
                маринования в нашей секретной смеси традиционных специй и
                медленного приготовления до совершенства на вертикальном гриле.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </Parallax>
  );
}
