import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as reservationActions from '../action/reservation.actions';
import { ReservationService, TableService } from 'restaurant-swagger-client';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { HelperService } from 'src/app/services/HelperService';

@Injectable()
export class ReservationEffects {
  constructor(
    private actions$: Actions,
    private reservationService: ReservationService,
    private tableService: TableService,
    private helperService: HelperService
  ) {}

  getReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.GetReservation),
      exhaustMap(({ query }) =>
        this.reservationService.reservationGet(query.start ? new Date(query.start) : undefined, query.end ? new Date(query.end) : undefined, query.seat).pipe(
          map((response): any => {
            const reservationOutput = response.map((dataItem: any) => {
              return this.helperService.convertToSchedulerEvent(dataItem);
            });
            return reservationActions.GetReservationSuccess({
              reservationOutput,
            });
          }),
          catchError((error: any) =>
            of(reservationActions.GetReservationFailure(error))
          )
        )
      ),
    )
  );

  getTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.GetTable),
      exhaustMap(({ }) =>
        this.tableService.tableGet().pipe(
          map((response): any => {         
            return reservationActions.GetTableSuccess({
              response,
            });
          }),
          catchError((error: any) =>
            of(reservationActions.GetTableFailure(error))
          )
        )
      ),
    )
  );
}
