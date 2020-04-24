import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface EstadoGlobalApp {
  ui: ui.State;
  user: auth.State;
}
export const appReducers: ActionReducerMap<EstadoGlobalApp> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
};
