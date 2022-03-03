import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
  locationForm: FormGroup = this.fb.group({
    floor: [
      '',
      Validators.compose([Validators.required, , Validators.pattern('^\\d*$')]),
    ],
    section: [
      '',
      Validators.compose([Validators.required, , Validators.pattern('^\\d*$')]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  saveChanges() {
    let location = {
      ...this.locationForm.value,
    };

    this.productsService.createLocation(location)?.subscribe((result) => {
      if (typeof result === 'string') alert(result);
    });
  }
}
