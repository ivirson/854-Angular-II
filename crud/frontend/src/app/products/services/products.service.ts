import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private categories = [
    {
      id: '1',
      name: 'Tech'
    },
    {
      id: '2',
      name: 'Beleza'
    },
    {
      id: '3',
      name: 'Auto'
    },
    {
      id: '4',
      name: 'Saúde'
    }
  ];

  constructor(private http: HttpClient) { }



  public getCategories(): ProductCategory[] {
    return this.categories;
  }

  public getProducts(): Product[] {
    const products = JSON.parse(localStorage.getItem('PRODUCTS') || '[]');
    return products
  }

  public getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:5000/products');
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
