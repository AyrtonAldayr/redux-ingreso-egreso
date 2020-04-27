import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../modules/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  // tslint:disable-next-line: no-inferrable-types
  tipo: string = 'ingreso';
  // tslint:disable-next-line: no-inferrable-types
  cargando: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<EstadoGlobalApp>,
  ) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
      .subscribe(ui => { this.cargando = ui.isLoading; });


    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) { return; }

    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se guardo satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        });
      }).catch((err) => {

        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }

}
