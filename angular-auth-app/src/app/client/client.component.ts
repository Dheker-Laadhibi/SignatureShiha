import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';

@Component({
  selector: 'app-client',
  template: `
    <div class="client-container">
      <mat-card class="client-card">
       <div class="card-header-custom">
  <h2 class="title">Client Management</h2>
  <button mat-raised-button color="primary" (click)="openAddClientDialog()" class="add-button">Add Client</button>
</div>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="clients" class="client-table">
              <ng-container matColumnDef="nom">
                <th mat-header-cell *matHeaderCellDef>Nom</th>
                <td mat-cell *matCellDef="let client">{{ client.nom }}</td>
              </ng-container>
              <ng-container matColumnDef="prenom">
                <th mat-header-cell *matHeaderCellDef>Prénom</th>
                <td mat-cell *matCellDef="let client">{{ client.prenom }}</td>
              </ng-container>
              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let client">{{ client.email }}</td>
              </ng-container>
              <ng-container matColumnDef="num_tel">
                <th mat-header-cell *matHeaderCellDef>Téléphone</th>
                <td mat-cell *matCellDef="let client">{{ client.num_tel || 'N/A' }}</td>
              </ng-container>
              <ng-container matColumnDef="signature">
                <th mat-header-cell *matHeaderCellDef>Signature</th>
                <td mat-cell *matCellDef="let client">
                  <img *ngIf="client.image_signature" [src]="client.image_signature" alt="Signature" class="signature-image">
                  <span *ngIf="!client.image_signature">N/A</span>
                </td>
              </ng-container>
              <ng-container matColumnDef="date_creation">
                <th mat-header-cell *matHeaderCellDef>Créé le</th>
                <td mat-cell *matCellDef="let client">{{ client.date_creation | date:'medium' }}</td>
              </ng-container>
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let client">
                  <button mat-icon-button color="primary" (click)="onUpdate(client)" aria-label="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="onDelete(client.id)" aria-label="Delete">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .client-container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 16px;
    }
    .client-card {
      background: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 16px;
    }
.card-header-custom {
  display: flex;
  justify-content: space-between; /* Titre à gauche, bouton à droite */
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 26px;
  font-weight: 600;
  color: #1976d2;
  margin: 0;
}

.add-button {
  font-weight: bold;
  padding: 8px 24px;
  background-color: #1976d2;
  color: white;
}

.add-button:hover {
  background-color: #1565c0;
}


    .table-container {
      overflow-x: auto;
    }
    .client-table {
      width: 100%;
      border-collapse: collapse;
    }
    .client-table th,
    .client-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    .client-table th {
      background: #1976d2;
      color: white;
    }
    .signature-image {
      max-width: 80px;
      max-height: 80px;
      object-fit: contain;
    }
    mat-card-title {
      text-align: center;
      color: #1976d2;
      font-size: 28px;
      font-weight: 500;
    }
    @media (max-width: 767px) {
      .client-container {
        padding: 8px;
      }
      .client-card {
        margin: 8px;
      }
      .client-table {
        font-size: 14px;
      }
    }
  `]
})
export class ClientComponent implements OnInit {
  clients: any[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'num_tel', 'signature', 'date_creation', 'actions'];

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => this.clients = clients,
      error: (err: Error) => this.showError(`Failed to load clients: ${err.message}`)
    });
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '400px',
      data: { client: { nom: '', prenom: '', email: '', num_tel: '', image_signature: null } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('nom', result.nom);
        formData.append('prenom', result.prenom);
        formData.append('email', result.email);
        if (result.num_tel) formData.append('num_tel', result.num_tel);
        if (result.selectedFile) formData.append('image_signature', result.selectedFile);

        this.clientService.createClient(formData).subscribe({
          next: () => {
            this.showSuccess('Client created successfully');
            this.loadClients();
          },
          error: (err: Error) => this.showError(`Failed to create client: ${err.message}`)
        });
      }
    });
  }

  onUpdate(client: any): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '400px',
      data: { client: { ...client } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('nom', result.nom);
        formData.append('prenom', result.prenom);
        formData.append('email', result.email);
        if (result.num_tel) formData.append('num_tel', result.num_tel);

        if (client.id) {
          this.clientService.updateClient(client.id, formData).subscribe({
            next: () => {
              this.showSuccess('Client updated successfully');
              this.loadClients();
            },
            error: (err: Error) => this.showError(`Failed to update client: ${err.message}`)
          });
        }
      }
    });
  }

  onDelete(id: number): void {
    if (id && confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.showSuccess('Client deleted successfully');
          this.loadClients();
        },
        error: (err: Error) => this.showError(`Failed to delete client: ${err.message}`)
      });
    }
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'error-snackbar' });
  }
}