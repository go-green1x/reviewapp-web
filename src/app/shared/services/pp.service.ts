import { Injectable } from '@angular/core';

import { UrlsService } from 'src/app/shared/services/urls.service';
import { BasicService } from 'src/app/shared/services/basic.service';
import { EMessages } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PpService {

  constructor(public urls: UrlsService, private bconn: BasicService) { }

}
