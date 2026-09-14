export type ProductDestination = "NONE" | "KITCHEN" | "BAR" | "PATISSERIE";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  stockAlertThreshold: number;
  destination: ProductDestination;
  active: boolean;
  categoryId: number;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  stockAlertThreshold: number;
  destination: ProductDestination;
  categoryId: number;
  active?: boolean;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  stockAlertThreshold: number;
  destination: ProductDestination;
  categoryId: number;
}