import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Responsible } from '../interfaces/responsible';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginGuard = inject(LoginService);

  const registrationLogin: any = localStorage.getItem('registration');
  const passwordLogin: any = localStorage.getItem('password');

  loginGuard
    .loginResponsible('564', '1234567')
    .then((result: any) => {
      if (result) {
        console.log('Existe result')
        console.log(result)
        return true;
      }else{
        console.log('Não Existe result')
        console.log(result)
        return false;
      }
    });
    return false ;
};

// const localData = localStorage.getItem('angular17token');

// console.log(localData)
// if (localData != null) {
//   return true;
// } else {
//   router.navigateByUrl('/login')
//   return false;
// }
// };
