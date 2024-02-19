import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AngularMaterialModule],
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

  constructor(private usersService: UsersService) {
    this.usersService.listCasts().then((users: User[]) => {
      this.users = users;

      console.log(this.users);
    });
  }
}
