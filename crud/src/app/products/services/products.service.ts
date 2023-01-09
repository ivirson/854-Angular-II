import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private categories = [
    {
      id: 'cc47a6b4-9052-11ed-a1eb-0242ac120002',
      name: 'Tech'
    },
    {
      id: 'd926dc38-9052-11ed-a1eb-0242ac120002',
      name: 'Beleza'
    },
    {
      id: 'e2386bac-9052-11ed-a1eb-0242ac120002',
      name: 'Auto'
    },
    {
      id: 'e7fa463c-9052-11ed-a1eb-0242ac120002',
      name: 'Saúde'
    }
  ];

  constructor() { }

  public getCategories(): ProductCategory[] {
    return this.categories;
  }

  public getProducts(): Product[] {
    const products = JSON.parse(localStorage.getItem('PRODUCTS') || '[]');
    return products.map((product: Product) => {
      return {
        ...product,
        category: this.categories.find(category => category.id === product.categoryId)
      }
    })
  }

  public saveProduct(product: Product): void {
    product = {
      ...product,
      id: crypto.randomUUID()
    }

    const products = this.getProducts();

    products.push(product);
    this.setLocalSorageData(products);
  }

  public getProductById(id: string): Product {
    const products = this.getProducts();
    return products.find(product => product.id === id) as Product;
  }

  public deleteProduct(id: string): void {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    products.splice(productIndex, 1);
    this.setLocalSorageData(products);
  }

  public editProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(u => u.id === product.id);
    products[index] = product;
    this.setLocalSorageData(products);
  }

  private setLocalSorageData(data: Product[]): void {
    localStorage.setItem('PRODUCTS', JSON.stringify(data));
  }
}
