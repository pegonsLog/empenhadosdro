import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

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
  }
  cast() {
    this.router.navigate(['report']);
  }
  responsible() {
    this.router.navigate(['responsibles-list']);
  }
  user() {
    this.router.navigate(['users-list']);
  }
  sector() {
    this.router.navigate(['sectors-list']);
  }
}
