import { Component } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['register'])
    throw new Error('Algo deu errado!');
  }
}
