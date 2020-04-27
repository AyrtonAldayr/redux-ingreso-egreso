import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../modules/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const { descripcion, monto, tipo } = { ...ingresoEgreso };
    // delete ingresoEgreso.uid;
    return this.firestore.doc(`${this.authService.getUsuario.uid}/ingreso-egresos`)
      .collection('items')
      .add({ descripcion, monto, tipo });
  }

  initIngresosEgresosList(uid: string) {
    return this.firestore.collection(`${uid}/ingreso-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snap => {
          return snap.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            };
          });
        })
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    return this.firestore.doc(`${this.authService.getUsuario.uid}/ingreso-egresos/items/${uidItem}`).delete();
  }
}
