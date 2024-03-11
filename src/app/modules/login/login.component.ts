import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Responsible } from '../../interfaces/responsible';
import { LoginService } from '../../services/login.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { LocalStorageService } from '../../services/local.storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm;

  private registration: string = 'registration';
  private nameResponsible: string = 'nameResponsible';
  private role: string = 'role';

  public responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
    id: '',
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
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

    if (
      this.responsible.registration ===
        this.loginForm.getRawValue().registration &&
      this.responsible.password === this.loginForm.getRawValue().password
    ) {
      this.localStorageService.setItem('registration', this.responsible.registration);
      this.localStorageService.setItem('nameResponsible', this.responsible.nameResponsible);
      this.localStorageService.setItem('office', this.responsible.office);
      this.localStorageService.setItem('sector', this.responsible.sector);
      this.localStorageService.setItem('shift', this.responsible.shift);
      this.localStorageService.setItem('role', this.responsible.role);

      {
        this.router.navigate(['home']);
      }
    } else {
      alert('Usuário não cadastrado!');
    }
  }
}
