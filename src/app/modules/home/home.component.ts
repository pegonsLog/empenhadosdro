import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public nameUser: string = '';
  public role: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.nameUser = this.activatedRoute.snapshot.queryParams['userName'];
    this.role = this.activatedRoute.snapshot.queryParams['role'];
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
