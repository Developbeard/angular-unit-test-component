import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ValueService } from 'src/app/services/value.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init'  = 'init';
  responseString: string = '';

  constructor(
    private productService: ProductsService,
    private valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAll(this.limit, this.offset)
      .subscribe({
        next: (resp) => {
          this.products = [...this.products, ...resp];
          this.offset += this.limit
          this.status = 'success';
        },
        error: () => {
          setTimeout(() => {
            this.products = [];
            this.status = 'error';
          }, 3000);
        }
      });
  }

  async callPromise(){
    const resp = await this.valueService.getPromiseValue();
    this.responseString = resp;
  }


}
