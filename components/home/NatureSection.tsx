"use client";

import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Leaf } from "lucide-react";

export function NatureSection() {
  return (
    <Parallax
      blur={0}
      bgImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
      strength={200}
      className="py-24"
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <FadeInWhenVisible>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Leaf className="w-12 h-12" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Мясо Премиального Качества</h2>
            <p className="text-lg mb-8">
              Наша говядина тщательно отбирается у проверенных местных фермеров, которые уделяют первостепенное внимание этичным и экологичным практикам. Мы стремимся поставлять мясо высочайшего качества, соблюдая стандарты ответственного фермерства.
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </Parallax>
  );
}