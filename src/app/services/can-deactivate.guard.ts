import { CanDeactivateFn } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';

export const canDeactivateGuard: CanDeactivateFn<HomeComponent> = (component, currentRoute, currentState, nextState) => {

  if(!component.isLogged){

    const conf = confirm('Você deseja sair');
    if(conf){
      return true;
    }else{
      return false;
    }
  }
};
