import { createAction, props } from '@ngrx/store';
import { Usuario } from '../modules/usuario.model';

export const quitarUsuario = createAction(
  '[Auth] Quitar Usuario'
);

export const agregarUsuario = createAction(
  '[Auth] Agregar Usuario',
  props<{ usuario: Usuario }>()
);
