export interface Course {
  id: number;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  rating: number;
}

export interface CartItem extends Course {
  quantity: number;
}
