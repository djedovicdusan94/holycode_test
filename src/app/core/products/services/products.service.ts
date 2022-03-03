import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsDb: Product[] = [
    {
      code: 'MYTZ 1234',
      quantity: 200,
      floor: 'Floor 1',
      section: 'Section 1',
    },
    {
      code: 'MY 3247',
      quantity: 1000,
      floor: 'Floor 1',
      section: 'Section 3',
    },
    {
      code: 'ABG 99993',
      quantity: 10,
      floor: 'Floor 2',
      section: 'Section 2',
    },
    {
      code: 'XY 1182',
      quantity: 50,
      floor: 'Floor 2',
      section: 'Section 3',
    },
    {
      code: 'PKIF 857261',
      quantity: 90,
      floor: 'Floor 3',
      section: 'Section 1',
    },
    {
      code: 'HYA 4477',
      quantity: 15,
      floor: 'Floor 3',
      section: 'Section 3',
    },
  ];
  private productsSource: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >(this.productsDb);
  products = this.productsSource.asObservable();

  floorsDb: any = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'];
  private floorsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.floorsDb
  );
  floors = this.floorsSource.asObservable();

  sectionsDb: any = ['Section 1', 'Section 2', 'Section 3', 'Section 4'];
  private sectionsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.sectionsDb
  );
  sections = this.sectionsSource.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  deleteProduct(productArg: Product): void {
    let productsArr = this.productsSource.getValue();
    let index = productsArr.indexOf(productArg);
    if (index !== -1) {
      productsArr.splice(index, 1);
    }
    this.productsSource.next(productsArr);
  }

  updateProduct(productArg: Product): Observable<any> {
    let productsArr = this.productsSource.getValue();

    // We want to know if this product is the current product or some other
    let product = productsArr.find(
      (x) => x.floor === productArg.floor && x.section === productArg.section
    );

    // if it is the same product commit update
    if (product?.code === productArg.code) {
      console.log('TEST');
      let index = productsArr.findIndex((product) => {
        return productArg.code === product.code;
      });

      if (index !== -1) {
        productsArr[index] = productArg;
      }

      this.productsSource.next(productsArr);

      return this.products;
    }

    if (product) {
      return of(
        'Location(Floor+Section) already exists. Check productsDb to see available slots.'
      );
    }

    // if it is some other product
    let index = productsArr.findIndex((product) => {
      return productArg.code === product.code;
    });

    if (index !== -1) {
      productsArr[index] = productArg;
    }

    this.productsSource.next(productsArr);

    return this.products;
  }

  createProduct(productArg: Product): Observable<any> {
    let productsArr = this.productsSource.getValue();

    for (let i = 0; i < productsArr.length; i++) {
      if (productsArr[i].code === productArg.code)
        return of('Code already exists.');

      if (
        productsArr[i].floor === productArg.floor &&
        productsArr[i].section === productArg.section
      ) {
        return of(
          'Location(Floor+Section) already exists. Check productsDb to see available slots.'
        );
      }
    }

    productsArr.push(productArg);
    this.productsSource.next(productsArr);
    return this.products;
  }

  getFloors() {
    return this.floors;
  }

  getSections() {
    return this.sections;
  }

  createLocation(location: any) {
    let floorsArr = this.floorsSource.getValue();
    let sectionsArr = this.sectionsSource.getValue();

    let floorErrors = 0;
    let sectionErrors = 0;

    if (!floorsArr.includes('Floor ' + location.floor)) {
      floorsArr.push('Floor ' + location.floor);
      this.floorsSource.next(floorsArr);
    } else {
      floorErrors++;
    }

    if (!sectionsArr.includes('Section ' + location.section)) {
      sectionsArr.push('Section ' + location.section);
      this.sectionsSource.next(sectionsArr);
    } else {
      sectionErrors++;
    }

    console.log(floorErrors);
    console.log(sectionErrors);

    if (floorErrors === 1 && sectionErrors === 1) {
      return of(
        'Specified floor or section already exists. Check floorDb/sectionDb to see available slots.'
      );
    }

    alert('Location created successfully.');

    return;
  }
}
