import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Responsible } from '../interfaces/responsible';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  // const router = inject(Router);
  const loginService = inject(LoginService);

  const registrationLogin: any = localStorage.getItem('registration');
  const passwordLogin: any = localStorage.getItem('password');

  const result = loginService.loginResponsible(registrationLogin, passwordLogin).then();

  if (result) {
    result.then((data) => console.log(data))
    return true;
  }

  return false

}


