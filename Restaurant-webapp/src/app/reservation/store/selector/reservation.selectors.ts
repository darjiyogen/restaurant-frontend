import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReservation from '../reducer/reservation.reducer';

export const selectReservationState = createFeatureSelector<fromReservation.ReservationState>(
    fromReservation.reservationFeatureKey,
);

export const selectReservations = createSelector(
    selectReservationState,
  (state: fromReservation.ReservationState) => state.reservations
);