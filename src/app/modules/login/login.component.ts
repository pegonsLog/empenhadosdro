import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });

  public userForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  public user: User = {
    user: '',
    password: '',
    role: '',
    nameUser: '',
  };

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  onSubmit() {
    
  
    this.loginService
      .loginUser(this.loginForm.getRawValue().user!)
      .then((user: User) => (this.user = user));

    this.router.navigate(['home'], { state: { name: this.user.nameUser } });
  }
}
