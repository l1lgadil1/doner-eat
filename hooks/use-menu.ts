"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { MenuItem } from "@/types/menu";
import { useToast } from "@/hooks/use-toast";

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const {data} = await api.get<MenuItem[]>("/menu");
      setMenuItems(data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
        "Не удалось загрузить меню. Пожалуйста, попробуйте позже.";
      setError(errorMessage);
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const createMenuItem = async (data: Partial<MenuItem>) => {
    try {
      const { data: newItem } = await api.post<MenuItem>("/menu", data);
      setMenuItems(prev => [...prev, newItem]);
      toast({
        title: "Успешно",
        description: "Блюдо успешно добавлено",
      });
      return newItem;
    } catch (err) {
      const errorMessage = "Не удалось создать блюдо. Пожалуйста, попробуйте позже.";
      setError(errorMessage);
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateMenuItem = async (data: Partial<MenuItem>) => {
    if (!data.id) throw new Error("Item ID is required for update");
    
    try {
      const { data: updatedItem } = await api.put<MenuItem>(`/menu/${data.id}`, data);
      setMenuItems(prev => 
        prev.map(item => item.id === data.id ? updatedItem : item)
      );
      toast({
        title: "Успешно",
        description: "Блюдо успешно обновлено",
      });
      return updatedItem;
    } catch (err) {
      const errorMessage = "Не удалось обновить блюдо. Пожалуйста, попробуйте позже.";
      setError(errorMessage);
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await api.delete(`/menu/${id}`);
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Успешно",
        description: "Блюдо успешно удалено",
      });
    } catch (err) {
      const errorMessage = "Не удалось удалить блюдо. Пожалуйста, попробуйте позже.";
      setError(errorMessage);
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  return {
    menuItems,
    isLoading,
    error,
    selectedItem,
    isModalOpen,
    handleOrderClick,
    handleCloseModal,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
}; 