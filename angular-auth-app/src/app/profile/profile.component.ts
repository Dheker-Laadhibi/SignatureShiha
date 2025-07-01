import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <mat-card class="profile-card">
      <mat-card-header>
        <mat-card-title>Agent Profile</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="profile-image-container">
          <img [src]="user?.imageUrl || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740'" alt="Profile Image" class="profile-image">
        </div>
        <p><strong>Name:</strong> {{ user?.name || 'Not Available' }}</p>
        <p><strong>Email:</strong> {{ user?.email || 'Not Available' }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .profile-card {
      max-width: 400px;
      margin: 2em auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 16px;
    }
    .profile-image-container {
      text-align: center;
      margin-bottom: 16px;
    }
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #673ab7;
    }
    mat-card-title {
      color: #673ab7;
      font-size: 24px;
      text-align: center;
      margin-bottom: 16px;
    }
    mat-card-content p {
      font-size: 16px;
      color: #333;
      margin: 8px 0;
    }
    mat-card-content p strong {
      color: #673ab7;
    }
    @media (max-width: 600px) {
      .profile-card {
        margin: 1em;
        width: 90%;
      }
      .profile-image {
        width: 120px;
        height: 120px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Failed to fetch user', err)
    });
  }
}