import { createAction, props } from '@ngrx/store';

export const GetReservation = createAction(
  '[Reservation] Get Reservations'
);

export const GetReservationSuccess = createAction('[Reservation] Get Tasks Success', props<any>());
export const GetReservationFailure = createAction('[Reservation] Get Tasks Failure', props<{any: any}>());


