import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ISnackBar } from 'src/app/core/models/shared.types';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatIconModule,
  MatButtonModule
]

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, ...material],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  @Input() snackbarData !: ISnackBar;
}
