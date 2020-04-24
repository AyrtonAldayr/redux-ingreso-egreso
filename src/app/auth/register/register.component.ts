import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<EstadoGlobalApp>,
  ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      console.log('cargando subs RegisterComponent');
    });
  }
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) { return; }
    this.store.dispatch(isLoading());
    /*Swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });*/
    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuaro(nombre, correo, password).then(credenciales => {
      console.log(credenciales);
      //Swal.close();
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

}
