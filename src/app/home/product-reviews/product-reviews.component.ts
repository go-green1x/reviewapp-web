import { Component } from '@angular/core';

import { PpService } from 'src/app/shared/services/pp.service';
import { UrlsService } from 'src/app/shared/services/urls.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent {
  constructor(private pp: PpService, public url: UrlsService,
    private _activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private ts: ToastService) { }
  productId!: number;
  productDetails: any;
  reviewForm!: FormGroup;
  reviewRating!: number;
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetails();
    });

    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required]],
      review: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  getProductDetails() {
    this.pp.getProductsReviews(this.productId).subscribe((results: any) => {
      console.log(results.body);
      this.productDetails = results.body;
    });
  }

  onSubmit(form: any) {
    if (this.reviewForm) {
      if (this.reviewForm.valid) {
        let rating = this.reviewForm.value['rating'];
        let review = this.reviewForm.value['review'];

        let payload = {
          "rating": rating,
          "review": review,
          "product": this.productId
        };

        this.pp.saveReview(payload).subscribe((result: any) => {
          if (result.ok == true) {
            form.reset();
            this.productDetails.reviews.push(result.body);
            this.ts.showToast('Review Posted', 1000, undefined);
          }
        });
      }
    }
  }

  deleteReview(id: number) {
    this.pp.deleteReview(id).subscribe((result: any) => {console.log(result);
      if (result.ok == true) {
        this.productDetails.reviews = this.productDetails.reviews.filter((x:any) => { return x?.id != id});
        this.ts.showToast('Review Deleted', 1000, undefined);
      }
    });
  }
}
