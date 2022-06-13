import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { parseDate } from "@progress/kendo-angular-intl";
import { BaseEditService, SchedulerModelFields } from "@progress/kendo-angular-scheduler";
import { zip, Observable, map, tap } from "rxjs";
import { Reservation } from "../models/reservation";
import { ReservationState } from "../reservation/store/reducer/reservation.reducer";
import * as reservationActions from '../reservation/store/action/reservation.actions';

const fields: any = {
    id: "TaskID",
    title: "Title",
    description: "Description",
    startTimezone: "StartTimezone",
    start: "Start",
    end: "End",
    endTimezone: "EndTimezone",
    location: "location",
    seats: "seates",
  };

@Injectable()
export class EditService extends BaseEditService<Reservation> {
  public loading = false;

  constructor(private http: HttpClient,  private store: Store<ReservationState>,) {
    super(fields);
  }

  public read(): void {
    if (this.data.length) {
      this.source.next(this.data);
      return;
    }
  }

  protected save(
    created: Reservation[],
    updated: Reservation[],
    deleted: Reservation[]
  ): void {
    const completed = [];
    if (deleted.length) {
      const reservation = deleted[0];
      this.store.dispatch(reservationActions.DeleteReservation(JSON.parse(JSON.stringify(reservation))));
    }

    if (updated.length) {
    
    }

    if (created.length) {
      const reservation = created[0];
      if(reservation.id){
        this.store.dispatch(reservationActions.UpdateReservation(JSON.parse(JSON.stringify(reservation))));
      }
      else{
        this.store.dispatch(reservationActions.CreateReservation(JSON.parse(JSON.stringify(reservation))));
      }
    }
  }
}
