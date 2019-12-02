import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReserveComponent, PopupAlertDialog } from './reserve/reserve.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reserve/:plateNumber', component: ReserveComponent },
  { path: 'bookings/:plateNumber', component: BookingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ReserveComponent, PopupAlertDialog, BookingsComponent];
export const entryComponents = [PopupAlertDialog];