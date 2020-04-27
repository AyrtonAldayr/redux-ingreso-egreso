import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/modules/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoEgresoSub: Subscription;

  constructor(
    private store: Store<EstadoGlobalApp>,
    private ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit() {
    this.ingresoEgresoSub = this.store.select('ingresoEgreso').subscribe(({ items }) => {
      this.ingresosEgresos = items;
    });
  }
  ngOnDestroy() {
    this.ingresoEgresoSub.unsubscribe();
  }

  borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch((err) => Swal.fire('Opps!!!', err, 'error'));
  }

}
