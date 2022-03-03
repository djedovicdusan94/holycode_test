import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() filters = new EventEmitter();
  @Output() reset = new EventEmitter();

  filtersObj: any = {};

  floors: any[];
  sections: any[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getFloors()
      .subscribe((floors) => (this.floors = floors));
    this.productsService
      .getSections()
      .subscribe((sections) => (this.sections = sections));
  }

  onChange() {
    this.filters.emit(this.filtersObj);
  }

  resetFilters() {
    this.filtersObj = {};
    this.reset.emit();
  }
}
