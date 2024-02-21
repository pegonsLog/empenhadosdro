import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Sector } from '../../../../interfaces/sector';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  public sectors = ['GAOPE', 'GARBO', 'GARNE', 'GARNP', 'GARVN', 'GEACE'];
  public shifts = ['Manhã', 'Tarde', 'Madrugada'];
  public offices = ['Coordenador', 'Supervisor', 'Gerente'];
  constructor(private router: Router) {}

  report() {
    this.router.navigate(['report']);
  }

  close() {
    this.router.navigate(['']);
  }
}
