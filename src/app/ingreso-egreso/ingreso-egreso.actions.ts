import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../modules/ingreso-egreso.model';

export const quitarItems = createAction(
  '[IngresoEgreso] Quitar Items'
);

export const agregarItems = createAction(
  '[IngresoEgreso] Agregar Items',
  props<{ items: IngresoEgreso[] }>()
);
