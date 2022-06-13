import { createAction, props } from '@ngrx/store';

export const GetReservation = createAction(
  '[Reservation] Get Reservations',
  props<any>()
);

export const GetReservationSuccess = createAction('[Reservation] Get Reservation Success', props<any>());
export const GetReservationFailure = createAction('[Reservation] Get Reservation Failure', props<{any: any}>());

export const GetTable = createAction(
  '[Table] Get Table'
  );

export const GetTableSuccess = createAction('[Table] Get Table Success', props<any>());
export const GetTableFailure = createAction('[Table] Get Table Failure', props<{any: any}>());


