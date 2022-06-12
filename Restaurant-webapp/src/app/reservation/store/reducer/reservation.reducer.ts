import { Action, createReducer, on } from '@ngrx/store';
import * as ReservationActions from '../action/reservation.actions';
import { Reservation } from 'src/app/models/reservation';


export const reservationFeatureKey = 'reservation';

export interface ReservationState {
    reservations: Reservation[];
}

export const initialState: ReservationState = {
  reservations: []
};

export const reducer = createReducer(
  initialState,
  on(ReservationActions.GetReservation,
        (state: ReservationState) =>
          ({...state
          })),
  on(ReservationActions.GetReservationSuccess,(state, result) => ({reservations: result.reservationOutput})
  
  )
);
