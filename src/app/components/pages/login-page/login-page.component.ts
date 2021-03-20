import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public emailSignIn(email: string, pasword: string) {
    this.authService.SignIn(email, pasword);
  }

  public googleSignin(): void {
    this.authService.GoogleAuth();
  }
}
