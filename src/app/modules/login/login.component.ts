import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponsible } from '../../interfaces/responsible';
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
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public registrationField: string = '564';
  public passwordField: string = '123456';

  public responsible: IResponsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
    id: '',
  };

  // private registration: string = 'registration';
  // private nameResponsible: string = 'nameResponsible';
  // private role: string = 'role';


  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      registrationField: ['564', Validators.required],
      passwordField: ['123456', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginService.loginResponsible('','').then((result)=>{result.registration = ''});
  }



  async onSubmit() {
    await this.loginService
      .loginResponsible(this.loginForm.getRawValue().registrationField, this.loginForm.getRawValue().passwordField)
      .then((responsible: IResponsible) => {
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
