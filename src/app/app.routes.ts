import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/cast/components/register/register.component';
import { ReportComponent } from './modules/cast/components/report/report.component';
import { UserListComponent } from './modules/user/components/user-list/user-list.component';
import { ResponsibleListComponent } from './modules/responsible/components/responsible-list/responsible-list.component';
import { SectorListComponent } from './modules/sector/components/sector-list/sector-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'users-list',
    component: UserListComponent,
  },
  {
    path: 'responsibles-list',
    component: ResponsibleListComponent,
  },
  {
    path: 'sectors-list',
    component: SectorListComponent,
  },
];
