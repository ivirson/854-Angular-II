import { ProductCategory } from "./product-category.model";

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  category: ProductCategory;
  price: number;
  quantity: number;
}
