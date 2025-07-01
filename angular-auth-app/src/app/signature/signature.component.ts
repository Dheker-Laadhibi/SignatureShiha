import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface SignatureResponse {
  client?: string;
  prediction?: string;
  confidence?: string;
  error?: string;
}

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent {
  email: string = '';
  selectedFile: File | null = null;
  result: SignatureResponse | null = null;
  error: string | null = null;
  isLoading: boolean = false;
  private apiUrl: string = 'http://localhost:8000/api/client'; // Matches backend base URL

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.email || !this.selectedFile) {
      this.error = 'Please provide both email and signature image';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.result = null;

    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('image', this.selectedFile);

    this.http.post<SignatureResponse>(`${this.apiUrl}/predict_signature/`, formData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.error) {
            this.error = response.error;
          } else {
            this.result = response;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.error = err.error?.error || 'An error occurred while verifying the signature';
          console.log('Error details:', err); // For debugging
        }
      });
  }
}