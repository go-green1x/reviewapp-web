import { Component } from '@angular/core';

import { PpService } from 'src/app/shared/services/pp.service';
import { UrlsService } from 'src/app/shared/services/urls.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Routes_URL } from 'src/app/shared/constants/routes';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent {
  constructor(private pp: PpService, public url: UrlsService,
    private _activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private ts: ToastService, public auth: AuthService, private route: Router) { }
  productId!: number;
  productDetails: any;
  reviewForm!: FormGroup;
  updateReviewForm!: FormGroup;
  reviewRating: number = 1;
  updateReviewRating!: number;
  editReviewId!: number;
  public routes_url = Routes_URL;
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetails();
    });

    this.reviewForm = this.fb.group({
      rating: [1, [Validators.required, Validators.min(1)]],
      review: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.updateReviewForm = this.fb.group({
      rating: [1, [Validators.required, Validators.min(1)]],
      review: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  getProductDetails() {
    this.pp.getProductsReviews(this.productId).subscribe((results: any) => {
      if (results.ok == true) {
        this.productDetails = results.body;
      }
      else {
        this.route.navigateByUrl('/'+this.routes_url.PRODUCTS);
      }
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
            this.reviewForm.patchValue({
              review: '',
              rating: 1
            });
            this.productDetails.reviews.push(result.body);
            this.ts.showToast('Review Posted', 3000, undefined);
          }
        });
      }
    }
  }

  deleteReview(id: number) {
    this.pp.deleteReview(id).subscribe((result: any) => {
      if (result.ok == true) {
        this.productDetails.reviews = this.productDetails.reviews.filter((x: any) => { return x?.id != id });
        this.ts.showToast('Review Deleted', 3000, undefined);
      }
    });
  }

  editReview(review: any) {
    this.editReviewId = review?.id;
    this.updateReviewForm.patchValue({
      review: review?.review,
      rating: review?.rating
    });
    this.updateReviewRating = review?.rating;
  }

  updateReview(reviewObj: any) {
    if (this.updateReviewForm) {
      if (this.updateReviewForm.valid) {
        let rating = this.updateReviewForm.value['rating'];
        let review = this.updateReviewForm.value['review'];

        let payload = {
          "rating": rating,
          "review": review,
          "product": this.productId
        };

        this.pp.updateReview(reviewObj.id, payload).subscribe((result: any) => {
          if (result.ok == true) {
            this.ts.showToast('Review Updated', 3000, undefined);
            let objIndex = this.productDetails.reviews.findIndex((obj: any) => { return obj.id == reviewObj.id });
            this.productDetails.reviews[objIndex] = result.body;
            this.editReviewId = -1;
          }
        });
      }
    }
  }
}
