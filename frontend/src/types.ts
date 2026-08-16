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

export interface UserView {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface ReviewView {
  id: number;
  courseId: number;
  userId: number;
  comment: string;
  createdAt: string;
}

export interface ReportSummary {
  users: number;
  courses: number;
  orders: number;
  revenue: number;
}
