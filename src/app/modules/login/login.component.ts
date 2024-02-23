import { Component, OnInit } from '@angular/core';
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
  public loginForm;

  public user: User = {
    user: '',
    password: '',
    role: '',
    nameUser: '',
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['564', Validators.required],
      password: ['123456', Validators.required],
    });
  }

  async onSubmit() {
    await this.loginService
      .loginUser(
        this.loginForm.getRawValue().user!,
        this.loginForm.getRawValue().password!
      )
      .then((user: User) => (this.user = user));

    if (this.user.user === this.loginForm.getRawValue().user && this.user.password === this.loginForm.getRawValue().password) {
      {
        this.router.navigate(['home'], {
          queryParams: { userName: this.user.nameUser, role: this.user.role },
        });
      }
    }else{alert('Usuário não cadastrado!')}
  }
}
