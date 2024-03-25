import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Responsible } from '../interfaces/responsible';

export const authGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);

  const registrationLogin: any = localStorage.getItem('registration');
  const passwordLogin: any = localStorage.getItem('password');

  loginService
    .loginResponsible(registrationLogin, passwordLogin)
    .then((result: Responsible) => {
      if (result.id) {
        return true;
      } else {
        return false;
      }
});
return false;
}
