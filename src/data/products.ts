import { Product } from '@/types';

// Sample product data for our food ordering website
export const products: Product[] = [
  {
    id: 1,
    name: "ROTI WITH BEEF SLICE",
    price: 10.99,
    oldPrice: 15.22,
    image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&w=500&h=500",
    rating: 4,
    category: "wraps",
    isFavorite: false
  },
  {
    id: 2,
    name: "WHOPPER BURGER KING",
    price: 13.99,
    oldPrice: 18.52,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&w=500&h=500",
    rating: 5,
    category: "burgers",
    isFavorite: false
  },
  {
    id: 3,
    name: "CHINESE PASTA",
    price: 9.99,
    oldPrice: 12.22,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&w=500&h=500",
    rating: 4,
    category: "pasta",
    isFavorite: false
  },
  {
    id: 4,
    name: "DELICIOUS BURGER",
    price: 11.99,
    oldPrice: 14.52,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&w=500&h=500",
    rating: 4,
    category: "burgers",
    isFavorite: false
  },
  {
    id: 5,
    name: "FAST FOOD COMBO",
    price: 15.99,
    oldPrice: 19.52,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&w=500&h=500",
    rating: 5,
    category: "combo",
    isFavorite: false
  },
  {
    id: 6,
    name: "ROTI WITH CHICKEN",
    price: 10.99,
    oldPrice: 13.52,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&w=500&h=500",
    rating: 4,
    category: "wraps",
    isFavorite: false
  },
  {
    id: 7,
    name: "GRILLED CHICKEN",
    price: 12.99,
    oldPrice: 15.22,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&w=500&h=500",
    rating: 4,
    category: "chicken",
    isFavorite: false
  },
  {
    id: 8,
    name: "DELICIOUS BURGER COMBO",
    price: 16.99,
    oldPrice: 19.52,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&w=500&h=500&q=80",
    rating: 5,
    category: "combo",
    isFavorite: false
  },
  {
    id: 9,
    name: "LOADED PASTA",
    price: 12.99,
    oldPrice: 15.22,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&w=500&h=500",
    rating: 4,
    category: "pasta",
    isFavorite: false
  },
  {
    id: 10,
    name: "FRENCH FRIES",
    price: 5.99,
    oldPrice: 7.52,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e70989?auto=format&w=500&h=500",
    rating: 4,
    category: "sides",
    isFavorite: false
  },
  {
    id: 11,
    name: "CRISPY CHICKEN NUGGETS",
    price: 8.99,
    oldPrice: 11.22,
    image: "https://images.unsplash.com/photo-1562967915-92ae0c320a25?auto=format&w=500&h=500",
    rating: 4,
    category: "chicken",
    isFavorite: false
  },
  {
    id: 12,
    name: "LARGE FRIES",
    price: 6.99,
    oldPrice: 8.52,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&w=500&h=500",
    rating: 4,
    category: "sides",
    isFavorite: false
  }
];

// Categories for filtering
export const categories = [
  { id: "all", name: "All" },
  { id: "burgers", name: "Burgers" },
  { id: "wraps", name: "Wraps" },
  { id: "chicken", name: "Chicken" },
  { id: "pasta", name: "Pasta" },
  { id: "combo", name: "Combos" },
  { id: "sides", name: "Sides" }
];