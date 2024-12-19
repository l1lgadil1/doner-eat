"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { FloatingElement } from "@/components/animations/FloatingElement";

export function HeroSection() {
  return (
      <Parallax
          blur={0}
          bgImage="https://images.unsplash.com/photo-1699728088614-7d1d4277414b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          bgImageAlt="Delicious doner kebab"
          strength={200}
          className="h-screen relative"
          bgImageStyle={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              transform: 'scale(1.1)',
          }}
          renderLayer={(percentage) => (
              <div
                  style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -${percentage * 50}%)`,
                      width: '100%',
                      height: '100%',
                  }}
              />
          )}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 h-screen flex flex-col items-center justify-center text-white text-center px-4">
              <FloatingElement>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Doner Eat</h1>
              </FloatingElement>

              <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
                  Самая вкусная шаурма в Центральной Азии
              </motion.p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                      size="lg"
                      className="bg-[#182da8] hover:bg-[#1425a8] text-white px-8 py-6 text-lg">
                      Посмотреть меню
                  </Button>
              </motion.div>
          </motion.div>
      </Parallax>
  );
}