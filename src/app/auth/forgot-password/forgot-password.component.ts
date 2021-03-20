import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  ngOnInit() {}

  public closeDialog() {
    this.dialogRef.close();
  }

  public onForgotPasswordClick(passwordResetEmail: string) {
    this.authService.ForgotPassword(passwordResetEmail);
  }
}
