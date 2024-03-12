import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/cast/components/register/register.component';
import { ReportComponent } from './modules/cast/components/report/report.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ResponsibleFormComponent } from './modules/responsible/components/responsible-form/responsible-form.component';
import { ResponsibleListComponent } from './modules/responsible/components/responsible-list/responsible-list.component';
import { UpdateComponent } from './modules/cast/components/update/update.component';
import { ResponsibleUpdateComponent } from './modules/responsible/components/responsible-update/responsible-update.component';

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
    path: 'update-cast',
    component: UpdateComponent,
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
    path: 'responsible-update',
    component: ResponsibleUpdateComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
