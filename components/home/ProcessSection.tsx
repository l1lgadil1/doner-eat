"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";

const processes = [
  {
    image: "https://img.freepik.com/free-photo/chef-preparing-meat-doner-kebab_179666-44812.jpg",
    title: "Preparation",
    description: "Fresh meat marinated in special spices"
  },
  {
    image: "https://img.freepik.com/free-photo/vertical-doner-meat-cooking_140725-6908.jpg",
    title: "Cooking",
    description: "Slow-cooked on vertical rotisserie"
  },
  {
    image: "https://img.freepik.com/free-photo/chef-cutting-meat-doner-kebab_179666-44814.jpg",
    title: "Serving",
    description: "Freshly sliced and served with care"
  }
];

export function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">Our Process</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover how we prepare your perfect doner kebab with traditional methods
          </p>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <FadeInWhenVisible key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden shadow-lg">
                  <div className="relative h-64">
                    <img
                      src={process.image}
                      alt={process.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}