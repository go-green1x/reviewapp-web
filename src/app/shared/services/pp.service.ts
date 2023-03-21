import { Injectable } from '@angular/core';

import { UrlsService } from 'src/app/shared/services/urls.service';
import { BasicService } from 'src/app/shared/services/basic.service';
import { EMessages } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PpService {

  constructor(public urls: UrlsService, private bconn: BasicService) { }

  getProductsList() {
    return this.bconn.get(this.urls.productsList(), this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  getProductsReviews(productId: number) {
    return this.bconn.get(this.urls.productsList() + productId + '/', this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  saveReview(body: any) {
    return this.bconn.post(this.urls.review(), body, this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  updateReview(id: number, body: any) {
    return this.bconn.put(this.urls.review() + id + '/', body, this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  deleteReview(id: number) {
    return this.bconn.delete(this.urls.review() + id + '/', this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }

  contactInquiry(body: any) {
    return this.bconn.post(this.urls.contactMail(), body, this.urls.header(), '', 1000, EMessages.SOMETHING_WENT_WRONG);
  }
}
