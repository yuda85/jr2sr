import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { AuthService } from 'src/app/shared/services/auth.service';
// import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public emailSignIn(email: string, pasword: string) {
    this.authService.SignIn(email, pasword);
  }

  public googleSignin(): void {
    this.authService
      .GoogleAuth()
      .then((value) => {
        console.log(value);
      })
      .finally(() => {
        this.router.navigate(['dashboard']);
      });
  }

  // public onForgotPassword(): void {}

  public openDialog() {
    this.dialog.open(ForgotPasswordComponent, {});
  }
}
