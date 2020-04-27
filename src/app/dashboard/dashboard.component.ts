import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { agregarItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresoEgresoSub: Subscription;
  constructor(
    private store: Store<EstadoGlobalApp>,
    private ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        filter((auth) => auth.user != null)
      )
      .subscribe(({ user }) => {
        console.log(user);
        this.ingresoEgresoSub = this.ingresoEgresoService.initIngresosEgresosList(user.uid)
          .subscribe(ingresosEgresos => {
            console.log(ingresosEgresos);
            this.store.dispatch(agregarItems({ items: ingresosEgresos }));
          });
      });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.ingresoEgresoSub.unsubscribe();
  }

}
