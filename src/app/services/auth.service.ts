import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../modules/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from '../app.reducer';
import * as authAction from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { quitarItems, agregarItems } from '../ingreso-egreso/ingreso-egreso.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  suscripcionUsuario: Subscription;

  private _usuario: Usuario;
  get getUsuario() {
    return { ...this._usuario };
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<EstadoGlobalApp>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.suscripcionUsuario = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((dataFirebaseUser: Usuario) => {

            const usu = Usuario.fromFirebase(dataFirebaseUser);
            this._usuario = usu;
            this.store.dispatch(authAction.agregarUsuario({ usuario: usu }));
          });
      } else {
        console.log('llamar unset del user');
        this._usuario = null;
        this.suscripcionUsuario?.unsubscribe();
        this.store.dispatch(authAction.quitarUsuario());
        this.store.dispatch(quitarItems());
      }
    });
  }

  crearUsuaro(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(fbUser => {
        const newUser = new Usuario(fbUser.user.uid, nombre, fbUser.user.email);
        console.log(`${fbUser.user.uid}/usuario`);
        return this.firestore.doc(`${fbUser.user.uid}/usuario`)
          .set({ ...newUser }).then(nuevoObjeto => {
            console.log('nuevoObjeto: ', nuevoObjeto);
          });
      });
  }

  iniciarSesion(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
