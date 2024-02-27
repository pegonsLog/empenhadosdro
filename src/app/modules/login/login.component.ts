import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Responsible } from '../../interfaces/responsible';
import { LoginService } from '../../services/login.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm;

  public responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: ''
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      registration: ['564', Validators.required],
      password: ['123456', Validators.required],
    });
  }

  async onSubmit() {
    await this.loginService
      .loginResponsible(
        this.loginForm.getRawValue().registration!,
        this.loginForm.getRawValue().password!
      )
      .then((responsible: Responsible) => (this.responsible = responsible));

    if (this.responsible.registration === this.loginForm.getRawValue().registration && this.responsible.password === this.loginForm.getRawValue().password) {
      {
        this.router.navigate(['home'], {
          queryParams: {registration: this.responsible.registration, nameResponsible: this.responsible.nameResponsible, role: this.responsible.role },
        });
      }
    }else{alert('Usuário não cadastrado!')}
  }
}
