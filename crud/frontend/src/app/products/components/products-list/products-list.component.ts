import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  public products!: Product[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.products = this.productsService.getProducts();
    console.log(this.products);

  }

  public editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  public deleteProduct(id: string): void {
    this.productsService.deleteProduct(id);
    this.getProducts();
  }
}
