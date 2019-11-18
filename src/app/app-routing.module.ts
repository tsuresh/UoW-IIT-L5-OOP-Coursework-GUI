import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReserveComponent, PopupAlertDialog } from './reserve/reserve.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reserve/:plateNumber', component: ReserveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ReserveComponent, PopupAlertDialog];
export const entryComponents = [PopupAlertDialog];