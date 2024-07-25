import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TicketPaymentComponent } from './ticket-payment/ticket-payment.component';
import { CaseLookupComponent } from './case-lookup/case-lookup.component';
import { JuryStatusComponent } from './jury-status/jury-status.component';
import { AttorneyLoginComponent } from './attorney-login/attorney-login.component';
import { AttorneyDashboardComponent } from './attorney-dashboard/attorney-dashboard.component';
import { UserListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pay-ticket', component: TicketPaymentComponent },
  { path: 'case-lookup', component: CaseLookupComponent },
  { path: 'jury-status', component: JuryStatusComponent },
  { path: 'attorney-login', component: AttorneyLoginComponent },
  { path: 'attorney-dashboard', component: AttorneyDashboardComponent },
  { path: 'users', component: UserListComponent },
];
