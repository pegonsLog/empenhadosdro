import { ActivatedRoute, CanDeactivateFn } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';
import { inject } from '@angular/core';

export const canDeactivateGuard: CanDeactivateFn<HomeComponent> = (component, currentRoute, currentState, nextState) => {

  if(!component.isLogged){
    nextState.root.data
    return confirm('Você deseja sair');
  }
    return true;
};
