import { createReducer, on } from '@ngrx/store';
import { agregarItems, quitarItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../modules/ingreso-egreso.model';
import { EstadoGlobalApp } from '../app.reducer';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends EstadoGlobalApp {
  ingresoEgreso: State;
}

export const initialState: State = {
  items: [],
};


// tslint:disable-next-line: variable-name
export const _ingesoEgresoReducerReducer = createReducer(
  initialState,
  on(agregarItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(quitarItems, state => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(state, action) {
  return _ingesoEgresoReducerReducer(state, action);
}
