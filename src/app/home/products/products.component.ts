import { Component } from '@angular/core';

import { PpService } from 'src/app/shared/services/pp.service';
import { UrlsService } from 'src/app/shared/services/urls.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  productList: any;
  constructor(private pp: PpService, public url: UrlsService) { }
  currentRate=7;
  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.pp.getProductsList().subscribe((results: any) => {
      this.productList = results.body;
      console.log(results);
    });
  }
}
