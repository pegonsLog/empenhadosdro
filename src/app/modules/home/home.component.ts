import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { Cast } from '../../interfaces/cast';
import { Responsible } from '../../interfaces/responsible';
import { ResponsiblesService } from '../../services/responsibles.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public listCastReportForm: FormGroup;
  public listCastRegisterForm: FormGroup;

  public isLogged: boolean = false;

  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
    id: '',
  };

  public casts: Cast[] = [
    {
      id: '',
      registration: '',
      nameResponsible: '',
      officeResponsible: '',
      scaleDate: '',
      sector: '',
      shift: '',
      withoutRestriction: 0,
      withRestriction: 0,
    },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private responsibleService: ResponsiblesService,
  ) {
    this.responsible.registration = localStorage.getItem('registration')!;
    this.responsible.nameResponsible = localStorage.getItem('nameResponsible')!;
    this.responsible.office = localStorage.getItem('office')!;
    this.responsible.sector = localStorage.getItem('sector')!;
    this.responsible.shift = localStorage.getItem('shift')!;
    this.responsible.role = localStorage.getItem('role')!;
    this.responsible.password = localStorage.getItem('password')!;

    this.listCastReportForm = this.formBuilder.group({
      castDate: [
        /*new Date().toLocaleDateString('pt-BR')*/ '26/02/2024',
        Validators.required,
      ],
      shift: ['Manhã', Validators.required],
    });

    this.listCastRegisterForm = this.formBuilder.group({
      registrationResponsible: [
        this.responsible.registration,
        Validators.required,
      ],
    });
  }

  public castReport() {
    const castDateReport = this.listCastReportForm.getRawValue().castDate!;
    const shiftReport = this.listCastReportForm.getRawValue().shift!;
    this.responsibleService
      .responsibleReportCast(castDateReport, shiftReport)
      .then(() => {
        if (this.listCastReportForm.valid) {
          localStorage.setItem('castDateReport', castDateReport);
          localStorage.setItem('shift', shiftReport);
          this.router.navigate(['report']);
        }
      });
  }

  public castRegister() {
    this.responsibleService
      .responsibleRegisterCast(localStorage.getItem('registration')!)
      .then((responsible: Responsible) => {
        this.router.navigate(['register']);
      });
  }

  responsibleList() {
    this.router.navigate(['responsible-list'], {
      queryParams: {
        nameResponsible: this.responsible.nameResponsible,
        role: this.responsible.role,
      },
    });
  }

  public close() {
    this.isLogged = false;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
