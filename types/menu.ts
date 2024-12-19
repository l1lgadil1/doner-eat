export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category: string;
}

export const menuItemToCartItem = (menuItem: MenuItem): CartItem => ({
  id: menuItem.id,
  name: menuItem.name,
  description: menuItem.description,
  price: menuItem.price.toString(),
  image: menuItem.image,
  category: menuItem.category,
}); 