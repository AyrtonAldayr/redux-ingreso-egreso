import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface EstadoGlobalApp {
  ui: ui.State;
  user: auth.State;
  ingresoEgreso: ingresoEgreso.State;
}
export const appReducers: ActionReducerMap<EstadoGlobalApp> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  ingresoEgreso: ingresoEgreso.ingresoEgresoReducer,
};
