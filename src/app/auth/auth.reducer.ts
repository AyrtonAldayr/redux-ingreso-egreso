import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../modules/usuario.model';
import { agregarUsuario, quitarUsuario } from './auth.actions';


export const authFeatureKey = 'auth';

export interface State {
  user: Usuario;
}

export const initialState: State = {
  user: null,
};


export const _AUT_REDUCER = createReducer(
  initialState,
  on(agregarUsuario, (state, { usuario }) => ({ ...state, user: { ...usuario } })),
  on(quitarUsuario, state => ({ ...state, user: null }))
);

export function authReducer(state, action) {
  return _AUT_REDUCER(state, action);
}
