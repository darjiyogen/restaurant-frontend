import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reservationFeatureKey, reducer } from './store/reducer/reservation.reducer';
import { ListComponent } from './list/list.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DropDownsModule,
    InputsModule,
    ButtonsModule,
    DateInputsModule,
    SchedulerModule,
    StoreModule.forFeature(reservationFeatureKey, reducer),
  ],
  exports: [
    ListComponent
  ]
})
export class ReservationModule { }
