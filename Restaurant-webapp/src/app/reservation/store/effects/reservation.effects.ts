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

  // Get Reservations with filter : Start, End and Seat
  getReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.GetReservation),
      exhaustMap(({ query }) =>
        this.reservationService
          .reservationGet(
            query.start ? new Date(query.start) : undefined,
            query.end ? new Date(query.end) : undefined,
            query.seat
          )
          .pipe(
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
      )
    )
  );

  // Get list of Tables
  getTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.GetTable),
      exhaustMap(({}) =>
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
      )
    )
  );

  // Create new Reservations
  createReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.CreateReservation),
      exhaustMap((reservation) => {
        const reservationVM =
          this.helperService.convertFromSchedulerEvent(reservation);
        return this.reservationService.reservationPost(reservationVM).pipe(
          map((response): any => {
            const responseVM =
              this.helperService.convertToSchedulerEvent(response);
            return reservationActions.CreateReservationSuccess(
              JSON.parse(JSON.stringify(responseVM))
            );
          }),
          catchError((error: any) =>
            of(reservationActions.CreateReservationFailure(error))
          )
        );
      })
    )
  );

  // Update Reservation
  updateReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.UpdateReservation),
      exhaustMap((reservation) => {
        const reservationVM =
          this.helperService.convertFromSchedulerEvent(reservation);
        return this.reservationService.reservationPut(reservationVM).pipe(
          map((response): any => {
            const responseVM =
              this.helperService.convertToSchedulerEvent(response);
            return reservationActions.UpdateReservationSuccess(
              JSON.parse(JSON.stringify(responseVM))
            );
          }),
          catchError((error: any) =>
            of(reservationActions.UpdateReservationFailure(error))
          )
        );
      })
    )
  );

  // Delete Reservation
  deleteReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reservationActions.DeleteReservation),
      exhaustMap((reservation) => {
        return of(reservationActions.DeleteReservationSuccess(reservation))
      })
    )
  );
}
