"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";

export function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold text-center mb-12">Наши Контакты</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInWhenVisible>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Контактная Информация</h3>
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center"
                    >
                      <MapPin className="w-5 h-5 mr-2 text-[#182da8]" />
                      <p>ул. Манаса 34, Алматы</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center"
                    >
                      <Phone className="w-5 h-5 mr-2 text-[#182da8]" />
                      <p>+7 777 123 4567</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center"
                    >
                      <Clock className="w-5 h-5 mr-2 text-[#182da8]" />
                      <p>Пн-Вс: 10:00 - 22:00</p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.9013139271704!2d76.90711147670392!3d43.235189571037544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x388369c0b4b4a7eb%3A0x5d2e37d0c56df1f8!2sInternational%20Information%20Technology%20University!5e0!3m2!1sen!2skz!4v1707297844315!5m2!1sen!2skz"
                    className="w-full h-64 rounded-lg"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </Card>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}