import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material';

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
    this.router.navigate(['register']);
    throw new Error('Algo deu errado!');
  }
}
