import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const registration = localStorage.getItem('registration');
  const password = localStorage.getItem('password');
  const router = inject(Router);

  if (registration && password) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
