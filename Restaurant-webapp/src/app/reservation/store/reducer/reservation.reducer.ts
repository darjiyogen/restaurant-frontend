import { Action, createReducer, on } from '@ngrx/store';
import * as ReservationActions from '../action/reservation.actions';
import { Reservation } from 'src/app/models/reservation';

export const reservationFeatureKey = 'reservation';

export interface ReservationState {
  reservations: Reservation[];
  query: {};
  tables: [];
  reservation: Reservation | null;
}

export const initialState: ReservationState = {
  reservations: [],
  query: {},
  tables: [],
  reservation: null
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
    reservation: null
  })),
  on(ReservationActions.GetTable, (state: ReservationState) => ({ ...state })),
  on(ReservationActions.GetTableSuccess, (state, result) => ({
    tables: result.response,
    query: state.query,
    reservations: state.reservations,
    reservation: null
  })),
  on(ReservationActions.CreateReservation, (state: ReservationState) => ({ ...state })),
  on(ReservationActions.CreateReservationSuccess, (state, result) => ({
    tables: result.response,
    query: state.query,
    reservations: [...state.reservations, result],
    reservation: null
  })),
  on(ReservationActions.UpdateReservation, (state: ReservationState) => ({ ...state })),
  on(ReservationActions.UpdateReservationSuccess, (state, result) => {
    const updatedArr = state.reservations.map(u => u.id !== result.id ? u : result);
    return {
      tables: state.tables,
      query: state.query,
      reservations: [...updatedArr],
      reservation: null
    }
  })
);
