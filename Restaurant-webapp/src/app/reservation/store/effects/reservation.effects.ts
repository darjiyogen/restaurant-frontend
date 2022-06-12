import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as reservationActions from '../action/reservation.actions';
import { ReservationService } from 'restaurant-swagger-client'
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { HelperService } from 'src/app/services/HelperService';

@Injectable()
export class ReservationEffects {

  constructor(private actions$: Actions,
    private reservationService: ReservationService,
    private helperService: HelperService
    ) {}

  getReservations$ = createEffect(() =>
  this.actions$.pipe(
    ofType(reservationActions.GetReservation),
    exhaustMap(action =>
      this.reservationService.rootGet().pipe(
        map((response): any => {
          const reservationOutput = response.map(
            (dataItem: any) => {
              return this.helperService.convertToSchedulerEvent(dataItem);
            });
          return reservationActions.GetReservationSuccess({ reservationOutput})
        }),
        catchError((error: any) => of(reservationActions.GetReservationFailure(error))))
    )
  )
);
}
