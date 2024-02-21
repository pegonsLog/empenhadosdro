import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../../../services/users.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [
    {
      user: '',
      password: '',
      role: '',
    },
  ];

  user: User = {
    user: '',
    password: '',
    role: '',
  };

  displayedColumns: string[] = [
    'user',
    'password',
    'role',
  ];

  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.listCasts().then((users: User[]) => {
      this.users = users;

      console.log(this.users);
    });
  }

  backToHome() {
    this.router.navigate(['home']);
  }
  goToAdd() {
    this.router.navigate(['user-form']);
  }
}
