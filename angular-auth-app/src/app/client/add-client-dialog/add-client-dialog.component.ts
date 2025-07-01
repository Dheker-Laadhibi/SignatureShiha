import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-dialog',
  template: `
    <h2 mat-dialog-title class="dialog-title">
      {{ data.client.id ? '✏️ Modifier le client' : ' Ajouter un client' }}
    </h2>

    <mat-dialog-content class="dialog-content">
      <form #clientForm="ngForm" (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-row">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Nom</mat-label>
            <input matInput [(ngModel)]="data.client.nom" name="nom" required>
          </mat-form-field>

          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Prénom</mat-label>
            <input matInput [(ngModel)]="data.client.prenom" name="prenom" required>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="data.client.email" name="email" type="email" required>
          </mat-form-field>

          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Numéro de téléphone</mat-label>
            <input matInput [(ngModel)]="data.client.num_tel" name="num_tel">
          </mat-form-field>
        </div>

        <div class="file-upload">
          <label for="signature-upload" class="file-label">
            <mat-icon>upload_file</mat-icon> Choisir une signature
          </label>
          <input type="file" id="signature-upload" (change)="onFileChange($event)" accept="image/*">
          <img *ngIf="previewUrl" [src]="previewUrl" class="preview-image" alt="Signature preview">
        </div>

        <div class="button-actions">
          <button mat-stroked-button color="warn" type="button" (click)="onCancel()">Annuler</button>
          <button mat-flat-button color="primary" [disabled]="!clientForm.valid" type="submit" class="save-button">Enregistrer</button>
        </div>
      </form>
    </mat-dialog-content>
  `,
  styles: [`
    .dialog-title {
      font-size: 26px;
      color: #1e88e5;
      text-align: center;
      font-weight: bold;
    }

    .dialog-content {
      padding: 20px;
      background: #ffffff; /* Clear background */
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      max-width: 800px;
      margin: auto;
    }

    .form-row {
      display: flex;
      gap: 20px;
      width: 100%;
    }

    .form-field {
      flex: 1;
    }

    mat-form-field {
      width: 100%;
    }

    .file-upload {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .file-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: linear-gradient(90deg, #4fc3f7, #2196f3); /* Stylized file input */
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .file-label:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
    }

    input[type="file"] {
      display: none;
    }

    .preview-image {
      max-height: 120px;
      max-width: 120px;
      border: 2px solid #e0e0e0;
      padding: 6px;
      border-radius: 8px;
      background: #f9f9f9;
    }

    .button-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 20px;
    }

    .save-button {
      background: linear-gradient(90deg, #42a5f5, #1976d2); /* Gradient blue button */
      color: white;
      font-weight: 500;
      padding: 8px 24px;
      border-radius: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .save-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 16px;
      }

      .form-field {
        width: 100%;
      }

      .dialog-content {
        padding: 12px;
      }

      .button-actions {
        flex-direction: column-reverse;
        gap: 12px;
      }

      .preview-image {
        max-width: 100%;
      }

      .file-label {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class AddClientDialogComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    const result = { ...this.data.client, selectedFile: this.selectedFile };
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}