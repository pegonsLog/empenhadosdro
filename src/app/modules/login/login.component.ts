import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from '../../interfaces/responsible';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { LoginService } from '../../services/login.service';
import { Location } from '@angular/common';
import { state } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // public loginForm: FormGroup;

  public registrationField: string = '564';
  public passwordField: string = '123456';

  // private registration: string = 'registration';
  // private nameResponsible: string = 'nameResponsible';
  // private role: string = 'role';

  public responsible: Responsible;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
    this.responsible = {
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: '',
      id: '',
    };
  }

  async onSubmit(registration: string, password: string) {
    await this.loginService
      .loginResponsible(registration, password)
      .then((responsible: Responsible) => {
        localStorage.setItem('registration', responsible.registration);
        localStorage.setItem('nameResponsible', responsible.nameResponsible);
        localStorage.setItem('office', responsible.office);
        localStorage.setItem('sector', responsible.sector);
        localStorage.setItem('shift', responsible.shift);
        localStorage.setItem('role', responsible.role);
        localStorage.setItem('password', responsible.password);
        this.router.navigate(['home']);
      });
  }
}
