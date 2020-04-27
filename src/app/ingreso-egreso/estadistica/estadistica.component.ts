import { Component, OnInit, OnDestroy } from '@angular/core';
import { EstadoGlobalApp } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/modules/ingreso-egreso.model';
import { Subscription } from 'rxjs';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos = 0;
  egresos = 0;
  totalEgresos = 0;
  totalIngresos = 0;
  ingresoEgresoSub: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<EstadoGlobalApp>) { }

  ngOnInit() {
    this.ingresoEgresoSub = this.store.select('ingresoEgreso')
      .subscribe(({ items }) => {
        this.generarEstadistica(items);
      });
  }

  ngOnDestroy() {
    this.ingresoEgresoSub.unsubscribe();
  }

  generarEstadistica(itesm: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    for (const item of itesm) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos = +item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos = +item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];

  }

}
