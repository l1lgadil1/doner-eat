"use client";

import { useState } from "react";
import { useMenu } from "@/hooks/use-menu";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, RefreshCcw } from "lucide-react";
import { MenuTable } from "@/components/admin/MenuTable";
import { MenuModal } from "@/components/admin/MenuModal";
import { MenuItem } from "@/types/order";

export default function MenuPage() {
  const { menuItems, isLoading, error, createMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#182da8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-red-500 text-center">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Обновить страницу
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Управление меню</h1>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить блюдо
        </Button>
      </div>

      <MenuTable 
        items={menuItems} 
        onEdit={handleEdit}
        onDelete={deleteMenuItem}
      />

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSubmit={editingItem ? updateMenuItem : createMenuItem}
      />
    </div>
  );
} 