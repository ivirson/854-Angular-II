import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category.model';

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

  public saveProduct(product: Product): Observable<any> {
    return this.http.post<any>('http://localhost:5000/products', product);
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:5000/products/${id}`);
  }

  public deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/products/${id}`);
  }

  public editProduct(product: Product): Observable<any> {
    return this.http.put<any>(`http://localhost:5000/products/${product.id}`, product);
  }

  private setLocalSorageData(data: Product[]): void {
    localStorage.setItem('PRODUCTS', JSON.stringify(data));
  }
}
