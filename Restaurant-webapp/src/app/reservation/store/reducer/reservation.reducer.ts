import { Action, createReducer, on } from '@ngrx/store';
import * as ReservationActions from '../action/reservation.actions';
import { Reservation } from 'src/app/models/reservation';

export const reservationFeatureKey = 'reservation';

export interface ReservationState {
  reservations: Reservation[];
  query: {};
  tables: [];
}

export const initialState: ReservationState = {
  reservations: [],
  query: {},
  tables: [],
};

export const reducer = createReducer(
  initialState,
  on(
    ReservationActions.GetReservation,
    (state: ReservationState, { query }) => ({ ...state, query })
  ),
  on(ReservationActions.GetReservationSuccess, (state, result) => ({
    reservations: result.reservationOutput,
    query: state.query,
    tables: state.tables,
  })),
  on(ReservationActions.GetTable, (state: ReservationState) => ({ ...state })),
  on(ReservationActions.GetTableSuccess, (state, result) => ({
    tables: result.response,
    query: state.query,
    reservations: state.reservations
  }))
);
