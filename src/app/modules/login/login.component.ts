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
  responsibleList() {
    this.router.navigate(['responsible-list']);
  }
  responsibleForm() {
    this.router.navigate(['responsible-form']);
  }
  userList() {
    this.router.navigate(['user-list']);
  }
  userForm() {
    this.router.navigate(['user-form']);
  }
  sectorList() {
    this.router.navigate(['sector-list']);
  }
  sectorForm() {
    this.router.navigate(['sector-form']);
  }
}
