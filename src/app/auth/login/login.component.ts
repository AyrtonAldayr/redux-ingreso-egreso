import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<EstadoGlobalApp>,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  iniciarSesion() {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch(isLoading());

    const { correo, password } = this.loginForm.value;

    this.authService.iniciarSesion(correo, password).then(() => {

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
