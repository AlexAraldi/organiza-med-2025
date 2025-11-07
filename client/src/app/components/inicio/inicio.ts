import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inicio',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './inicio.html',
})
export class Inicio {}
