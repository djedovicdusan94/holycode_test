import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <h2>{{ product.code }}</h2>
      <div class="quantity">Quantity: {{ product.quantity }}</div>
      <div class="location">
        Location: {{ product.floor }} / {{ product.section }}
      </div>
      <a type="button" class="update-product-btn" (click)="editProduct(product)"
        >Edit Product</a
      >
      <a class="delete-product-btn" (click)="deleteProduct(product)"
        >Delete Product</a
      >
    </div>
  `,
})
export class ProductItemComponent {
  @Input() product: any;
  @Output() productToEdit: EventEmitter<any> = new EventEmitter();
  @Output() productToDelete: EventEmitter<any> = new EventEmitter();

  editProduct(product: Product) {
    this.productToEdit.emit(product);
  }

  deleteProduct(product: Product) {
    this.productToDelete.emit(product);
  }
}
