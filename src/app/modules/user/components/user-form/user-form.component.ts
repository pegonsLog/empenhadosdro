import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  constructor(private router: Router) {}

  userList() {
    this.router.navigate(['user-list']);
  }

  close() {
    this.router.navigate(['']);
  }
}
