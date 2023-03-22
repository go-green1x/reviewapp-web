import { Component } from '@angular/core';

import { PpService } from 'src/app/shared/services/pp.service';
import { UrlsService } from 'src/app/shared/services/urls.service';
import { Routes_URL } from 'src/app/shared/constants/routes';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  productList: any;
  public routes_url = Routes_URL;
  productsByCategory: { [category: string]: any[] } = {};
  constructor(private pp: PpService, public url: UrlsService) { }
  currentRate = 7;
  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.pp.getProductsList().subscribe((results: any) => {
      this.productList = results.body;
      this.separateByCategory(this.productList);
    });
  }

  separateByCategory(products: any) {
    if (products) {
      for (const product of products) {
        if (!this.productsByCategory[product.category]) {
          this.productsByCategory[product.category] = [];
        }
        this.productsByCategory[product.category].push(product);
      }
    }
  }

  addEllipsis(maxLength: number, text: string) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + ' ...';
    }
    else {
      return text;
    }
  }
}