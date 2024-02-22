import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../../../services/users.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  public existData: boolean = false;
  users: User[] = [
    {
      user: '',
      password: '',
      role: '',
      nameUser: ''
    },
  ];

  user: User = {
    user: '',
    password: '',
    role: '',
    nameUser: ''
  };

  displayedColumns: string[] = [
    'user',
    'password',
    'role',
  ];

  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.listCasts().then((users: User[]) => {
      if(users) {this.existData = true,
      this.users = users;}
    })}


  backToHome() {
    this.router.navigate(['home']);
  }
  goToAdd() {
    this.router.navigate(['user-form']);
  }
}
