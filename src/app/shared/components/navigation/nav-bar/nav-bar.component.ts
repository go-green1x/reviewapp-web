import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Routes_URL } from 'src/app/shared/constants/routes';
import { UrlsService } from 'src/app/shared/services/urls.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public routes_url = Routes_URL;
  isMenuCollapsed = true;
  
  constructor(public auth:AuthService, private route: Router, public urls: UrlsService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout().subscribe((data) => {
      if (data.status == 200 || 204) {
        this.auth.removetoken();
        this.route.navigateByUrl('/'+this.routes_url.AUTH+'/'+this.routes_url.SIGN_IN);
      }
    });
  }
}
