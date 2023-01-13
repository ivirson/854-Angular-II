import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  public products$!: Observable<Product[]>;
  public products!: Product[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.products$ = this.productsService.getProductsList();
    const listCategories = this.productsService.getCategories();
    this.products$.pipe(tap(products => {
      return products.map(product => {
        debugger
        product.category = listCategories.find(category => category.id == product.categoryId)
      })
    }))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products = res
        }
      })
  }

  public editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  public deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe();
    this.getProducts();
  }
}
