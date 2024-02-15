import { Routes } from '@angular/router';
import { LoginComponent } from './modules/cast/login/login.component';
import { RegisterComponent } from './modules/cast/components/register/register.component';
import { ReportComponent } from './modules/cast/components/report/report.component';

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
];
