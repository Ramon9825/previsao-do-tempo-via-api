import { ConfigState, configReducer } from './config/config.reducer';
import { RouterState } from './router/router.reducer';
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    router: RouterReducerState<RouterState>,
    config: ConfigState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    config: configReducer
}