import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './containers/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './presentational/product-item/product-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './containers/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './presentational/filters/filters.component';
import { LocationFormComponent } from './presentational/location-form/location-form.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':id',
    component: ProductComponent,
  },
  {
    path: 'add-new',
    component: ProductComponent,
  },
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ProductComponent,
    FiltersComponent,
    LocationFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ProductsService, SharedModule],
})
export class ProductsModule {}
