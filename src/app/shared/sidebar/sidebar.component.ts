import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { EstadoGlobalApp } from 'src/app/app.reducer';
import { Subscription, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  userSubs: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<EstadoGlobalApp>,
  ) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) => {
        this.nombre = user.nombre;
      });
  }
  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  cerrarSesion() {
    Swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    this.authService.logout().then(() => {
      Swal.close();
      this.router.navigate(['login']);
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

}
