import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, tap } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productsService.getProducts();
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product);
  }

  filterChanged($event: any) {
    this.products$ = this.productsService.getProducts().pipe(
      map((products) => {
        let filteredProducts = products.filter((product: any) => {
          for (let key in $event) {
            if (
              key === 'code' &&
              (product[key] === undefined ||
                !product[key].includes($event[key].toUpperCase()))
            ) {
              return false;
            }
            if (
              (key === 'floor' || key === 'section') &&
              (product[key] === undefined ||
                !product[key].includes($event[key]))
            ) {
              return false;
            }
          }
          return true;
        });
        return filteredProducts;
      })
    );
  }
}
