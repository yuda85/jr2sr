import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { VerifyEmailComponent } from '../../verify-email/verify-email.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public emailSignup(email: string, password: string): void {
    this.authService.SignUp(email, password).then((data) => {
      if (this.validateEmail(email) && this.validatePassword(password)) {
        this.dialog.open(VerifyEmailComponent, {});
        this.router.navigate(['dashboard']);
      }
    });
  }

  public googleSignup(): void {
    this.authService.GoogleAuth();
  }

  private validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re) {
      this.snackbar.open('Email Not Valid');
    }
    return re.test(String(email).toLowerCase());
  }

  private validatePassword(pass: string): boolean {
    if (pass.length < 6) {
      this.snackbar.open('Password has to be longer than 6 charechters');
    }
    return pass.length >= 6;
  }
}
