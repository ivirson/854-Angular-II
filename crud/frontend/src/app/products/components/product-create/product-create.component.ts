import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/users/models/user.model';
import { ProductCategory } from '../../models/product-category.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  public form!: FormGroup;
  public product!: User;
  public productId!: string;
  public categories!: ProductCategory[];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.buildForm();
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.updateForm();
    }
  }

  private getCategories(): void {
    this.categories = this.productsService.getCategories();
  }

  private updateForm(): void {
    this.productsService.getProductById(this.productId).subscribe(
      {
        next: (res) => {
          const product = res
          product.categoryId = product.categoryId + ""
          this.form.patchValue(product)
        }
      })
  }

  private buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
    })
  }

  public onSubmit(): void {
    const product = this.form.getRawValue();

    if (this.productId) {
      this.productsService.editProduct(product).subscribe();
    } else {
      this.productsService.saveProduct(product).subscribe();
    }

    this.form.reset();
    this.router.navigate(['/products']);
  }
}
