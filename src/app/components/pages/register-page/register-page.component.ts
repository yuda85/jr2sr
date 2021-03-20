import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public emailSignup(email: string, password: string): void {
    this.authService.SignUp(email, password);
  }

  public googleSignup(): void {
    this.authService.GoogleAuth();
  }
}
