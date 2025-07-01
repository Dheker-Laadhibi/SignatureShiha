import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="image-section">
        <img src="https://www.entreprises-magazine.com/wp-content/uploads/2019/12/VERMEG-certification-Gold.jpg" alt="Login Image" class="login-image" />
      </div>
      <div class="form-section">
        <mat-card>
          <mat-card-header class="card-header">
            <mat-card-title>Connexion</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm" novalidate>
              <mat-form-field appearance="fill">
                <mat-label>Email</mat-label>
                <input
                  matInput
                  placeholder="Votre email"
                  [(ngModel)]="credentials.email"
                  name="email"
                  type="email"
                  required
                  #email="ngModel"
                />
                <mat-error *ngIf="email.invalid && email.touched">
                  Email est requis et doit être valide
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Mot de passe</mat-label>
                <input
                  matInput
                  placeholder="Votre mot de passe"
                  [(ngModel)]="credentials.password"
                  name="password"
                  type="password"
                  required
                  minlength="6"
                  #password="ngModel"
                />
                <mat-error *ngIf="password.invalid && password.touched">
                  Mot de passe requis (6 caractères minimum)
                </mat-error>
              </mat-form-field>

              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="loginForm.invalid"
              >
                Se connecter
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      height: 100vh;
      background: transparent;
    }
    .image-section {
      flex: 1.5;
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
    }
    .login-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      transition: transform 0.5s ease;
    }
    .image-section:hover .login-image {
      transform: scale(1.05);
    }
    .form-section {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      padding: 20px;
    }
    mat-card {
      width: 100%;
      max-width: 450px;
      padding: 24px;
      background: #fff;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
    }
    .card-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
    }
    mat-card-title {
      text-align: center;
      color: #1976d2;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
    button {
      width: 100%;
      padding: 14px;
      font-weight: 600;
      font-size: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15);
      transition: all 0.3s ease;
    }
    button:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-2px);
      box-shadow: 0 7px 16px rgba(37, 99, 235, 0.25);
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .login-container {
        flex-direction: column;
        height: auto;
      }
      .image-section, .form-section {
        flex: none;
        width: 100%;
      }
      .login-image {
        max-height: 250px;
        margin: 0 auto 20px;
      }
      mat-card {
        margin-top: 16px;
      }
    }
  `]
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) return;

    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => console.error('Login failed', err)
    });
  }
}
