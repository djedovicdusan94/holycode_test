import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productForm: FormGroup = this.fb.group({
    code: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Z]{2,4} \\d{4,6}$'),
      ]),
    ],
    quantity: [
      '',
      Validators.compose([Validators.required, Validators.pattern('^\\d*$')]),
    ],
    floor: [null, Validators.required],
    section: [null, Validators.required],
  });

  mode: 'create' | 'update';

  floors: any[];
  sections: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.productsService
      .getFloors()
      .subscribe((floors) => (this.floors = floors));
    this.productsService
      .getSections()
      .subscribe((sections) => (this.sections = sections));

    const param = this.route.snapshot.params['id'];
    if (param === 'add-new') {
      this.mode = 'create';
    } else {
      this.mode = 'update';
      this.productsService
        .getProducts()
        .pipe(
          map((products) => {
            return products.find((product) => product.code === param);
          }),
          tap((product) => {
            this.productForm.patchValue(product!);
          })
        )
        .subscribe();
    }
  }

  saveChanges() {
    let product = {
      ...this.productForm.value,
    };
    if (this.mode === 'create')
      this.productsService.createProduct(product).subscribe((result) => {
        if (typeof result === 'string') alert(result);
      });
    else {
      this.productsService.updateProduct(product).subscribe((result) => {
        if (typeof result === 'string') alert(result);
      });
    }
    this.router.navigate(['/']);
  }
}
