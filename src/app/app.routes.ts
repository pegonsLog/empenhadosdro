import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/cast/components/register/register.component';
import { ReportComponent } from './modules/cast/components/report/report.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ResponsibleFormComponent } from './modules/responsible/components/responsible-form/responsible-form.component';
import { ResponsibleListComponent } from './modules/responsible/components/responsible-list/responsible-list.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
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
    path: 'responsible-list',
    component: ResponsibleListComponent,
  },
  {
    path: 'responsible-form',
    component: ResponsibleFormComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
