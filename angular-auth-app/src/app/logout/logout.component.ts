import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Logout</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Are you sure you want to logout?</p>
        <button mat-raised-button color="warn" (click)="onLogout()">Logout</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: ['mat-card { max-width: 400px; margin: 2em auto; }']
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Logout failed', err)
    });
  }
}