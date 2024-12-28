"use client";

import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import Image from "next/image";

const images = [
    {
        url: 'https://images.unsplash.com/photo-1700925899171-f6ef2369c4b6?q=80&w=3048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Свежее Приготовление',
        description: 'Наши повара тщательно готовят каждый донер'
    },
    {
        url: 'https://images.unsplash.com/photo-1639737611208-a01d87b78605?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Подача',
        description: 'Традиционная алматинская подача'
    },
    {
        url: 'https://avatars.mds.yandex.net/get-eda/3377781/1693e95e864c4a24876750592f2a0f3f/M_height',
        title: 'Удобно',
        description: 'Идеально подходит как для перекуса так и для полноценного приема пищи'
    },
    {
        url: 'https://sxodim.com/uploads/posts/2023/05/29/optimized/a576aceea95999f97c3cfb6ba09d922e_1400x790-q-85.jpg',
        title: 'Закажи друзьям',
        description: 'Отлично подходит для компании'
    }
];

export function GallerySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Наши Специальности</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Откройте для себя наш восхитительный выбор алматинских донеров
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <FadeInWhenVisible key={index}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
              >
                <div className="aspect-[16/10] relative">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* <FadeInWhenVisible>
          <motion.div
            className="text-center mt-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-[#182da8] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1425a8] transition-colors">
              Полное Меню
            </button>
          </motion.div>
        </FadeInWhenVisible> */}
      </div>
    </section>
  );
}
