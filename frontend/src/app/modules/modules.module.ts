import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { AuthModule } from './auth/auth.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

const material = [
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    AuthModule,
    ...material
  ]
})
export class ModulesModule { }
