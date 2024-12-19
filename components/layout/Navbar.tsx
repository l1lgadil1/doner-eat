"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/orders/${orderId.trim()}`);
      setShowTrackOrder(false);
      setOrderId("");
    }
  };

  if (pathname.includes('/admin')) {
    return null;
  }

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-[#182da8]">
            <Link href='/'>DonerEat</Link>
          </div>

          <div className="flex items-center gap-2">
            {showTrackOrder ? (
              <form 
                onSubmit={handleTrackOrder}
                className="flex items-center gap-2"
              >
                <Input
                  type="text"
                  placeholder="Введите ID заказа"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full max-w-[200px]"
                  autoFocus
                />
                <Button 
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Найти</span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowTrackOrder(false);
                    setOrderId("");
                  }}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                onClick={() => setShowTrackOrder(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span>Отследить заказ</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}