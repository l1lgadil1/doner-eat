'use client'
import { usePathname } from 'next/navigation';

export function Footer() {
    const pathname = usePathname();
    if (pathname.includes('/admin')) {
        return null;
    }
  return (
    <footer className="bg-[#182da8] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Doner eat</h3>
            <p className="text-blue-100">
              Премиальный донер алматинского качества
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Время работы</h3>
            <p className="text-blue-100">Понедельник - Воскресенье</p>
            <p className="text-blue-100">10:00 - 22:00</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <p className="text-blue-100">ул. Абая 123, Алматы</p>
            <p className="text-blue-100">+7 777 123 4567</p>
            <p className="text-blue-100">info@donerhouse.kz</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-200/20 text-center text-blue-100">
          © {new Date().getFullYear()} Doner eat. Все права защищены.
        </div>
      </div>
    </footer>
  );
}