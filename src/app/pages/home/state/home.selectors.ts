import { HomeState } from './home.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectHomeState = createFeatureSelector('home');

export const selectCurrentWeather = createSelector(
    selectHomeState,
    (homeState: HomeState) => homeState.entity
);

export const selectCurrentWeatherLoading = createSelector(
    selectHomeState,
    (homeState: HomeState) => homeState.loading
);

export const selectCurrentWeatherError = createSelector(
    selectHomeState,
    (homeState: HomeState) => homeState.error
);