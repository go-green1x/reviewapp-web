import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reviewapp-web';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.isLoggedIn);
    this.auth.authFlow();
  }

}
