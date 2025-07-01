import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <mat-card class="register-card">
      <mat-card-header class="card-header">
        <mat-card-title>Register</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" class="register-form">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Name</mat-label>
            <input matInput placeholder="Enter your name" [(ngModel)]="user.name" name="name" required>
          </mat-form-field>
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput placeholder="Enter your email" [(ngModel)]="user.email" name="email" type="email" required>
          </mat-form-field>
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput placeholder="Enter your password" [(ngModel)]="user.password" name="password" type="password" required>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" class="register-button">Register</button>
        </form>

        <!-- 👇 Lien vers login ajouté ici -->
        <div class="login-redirect">
          Déjà inscrit ? <a routerLink="/login">Connectez-vous ici</a>
        </div>

      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .register-card {
      max-width: 450px;
      margin: 2em auto;
      padding: 16px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    .card-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
    }
    .register-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .full-width {
      width: 100%;
    }
    .register-button {
      padding: 10px;
    }
    mat-card-title {
      text-align: center;
      color: #1976d2;
      margin: 0;
      font-size: 24px;
    }
    .login-redirect {
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
      color: #555;
    }
    .login-redirect a {
      color: #1976d2;
      text-decoration: none;
      font-weight: bold;
      margin-left: 4px;
    }
    .login-redirect a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Registration failed', err)
    });
  }
}
