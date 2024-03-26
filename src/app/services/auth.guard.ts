import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const registration = localStorage.getItem('registration');

  if (registration) {
    console.log(registration);
    return true;
  } else {
    return false;
  }
};
