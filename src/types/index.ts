// Types for our application

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number; // For discounted prices
  image: string;
  rating: number;
  category: string;
  isFavorite: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}