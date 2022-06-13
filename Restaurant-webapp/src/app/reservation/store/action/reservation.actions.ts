import { createAction, props } from '@ngrx/store';

export const GetReservation = createAction(
  '[Reservation] Get Reservations',
  props<any>()
);
export const GetReservationSuccess = createAction('[Reservation] Get Reservation Success', props<any>());
export const GetReservationFailure = createAction('[Reservation] Get Reservation Failure', props<{any: any}>());


export const CreateReservation = createAction(
  '[Reservation] Create Reservations',
  props<any>()
);

export const CreateReservationSuccess = createAction('[Reservation] Create Reservation Success', props<any>());
export const CreateReservationFailure = createAction('[Reservation] Create Reservation Failure', props<{any: any}>());

export const UpdateReservation = createAction(
  '[Reservation] Update Reservations',
  props<any>()
);
export const UpdateReservationSuccess = createAction('[Reservation] Update Reservation Success', props<any>());
export const UpdateReservationFailure = createAction('[Reservation] Update Reservation Failure', props<{any: any}>());


export const GetTable = createAction(
  '[Table] Get Table'
  );

export const GetTableSuccess = createAction('[Table] Get Table Success', props<any>());
export const GetTableFailure = createAction('[Table] Get Table Failure', props<{any: any}>());


