import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReserveComponent, PopupAlertDialog } from './reserve/reserve.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AvailableComponent } from './available/available.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'reserve/:plateNumber', component: ReserveComponent },
  { path: 'bookings/:plateNumber', component: BookingsComponent },
  { path: 'available', component: AvailableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ReserveComponent, PopupAlertDialog, BookingsComponent, AvailableComponent];
export const entryComponents = [PopupAlertDialog];