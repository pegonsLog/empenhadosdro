import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public nameUser: string = '';

  constructor(private router: Router) {
    this.nameUser = this.router.getCurrentNavigation()?.extras.state?.['name'];
  }

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
