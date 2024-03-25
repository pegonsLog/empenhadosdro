import { Component, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsible } from '../../interfaces/responsible';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

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

  constructor(private router: Router) {
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


  async onSubmit() {
 
    localStorage.setItem('registration', this.registrationField);
    localStorage.setItem('password', this.passwordField);
    this.router.navigate(['home']);
  }
}
