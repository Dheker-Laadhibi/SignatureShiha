import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/home">VermegGuard</a>
      <span class="spacer"></span>
      <a mat-button routerLink="/register">Register</a>
      <a mat-button routerLink="/login">Login</a>
      <a mat-button routerLink="/profile">Profile</a>
      <a mat-button routerLink="/logout">Logout</a>
      <a mat-button routerLink="/signiature">Signature</a>
      <a mat-button routerLink="/client"> Nos Client</a>


    </mat-toolbar>
    <router-outlet> </router-outlet>
  `,
  styles: ['.spacer { flex: 1 1 auto; }']
})
export class AppComponent { }