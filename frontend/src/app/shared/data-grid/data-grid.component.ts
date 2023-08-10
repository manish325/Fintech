import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

const material = [
  MatTableModule
]

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, ...material],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  @Input() displayedColumns :string[] = [];
  @Input() dataSource : any[] = [];


}
