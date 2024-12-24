"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ClipboardList, 
  UtensilsCrossed,
  LogOut 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/providers/AuthProvider";

const menuItems = [
  {
    title: "Панель",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Заказы",
    href: "/admin/orders",
    icon: ClipboardList
  },
  {
    title: "Меню",
    href: "/admin/menu",
    icon: UtensilsCrossed
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutAdmin } = useAdminAuth();

  const handleLogout = () => {
    logoutAdmin();
    router.push('/login');
  };

  return (
    <div className="w-64 bg-white border-r h-screen p-4">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <Link href="/">
            <h1 className="text-2xl font-bold text-[#182da8]">DonerEat Admin</h1>
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                    pathname === item.href
                      ? 'bg-[#182da8] text-white'
                      : 'hover:bg-gray-100',
                  )}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
} 