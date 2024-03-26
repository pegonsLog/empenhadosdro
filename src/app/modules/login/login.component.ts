import { Component, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from '../../interfaces/responsible';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { LoginService } from '../../services/login.service';

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

  private registration: string = 'registration';
  private nameResponsible: string = 'nameResponsible';
  private role: string = 'role';

  public responsible: Responsible;

  constructor(private router: Router, private loginService: LoginService) {
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
        this.router.navigate(['home']);
      });
  }
}
