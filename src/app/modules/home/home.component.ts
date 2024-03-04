import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { Cast } from '../../interfaces/cast';
import { Responsible } from '../../interfaces/responsible';
import { ResponsiblesService } from '../../services/responsibles.service';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { CastsService } from '../../services/casts.service';

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

  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
  };

  public casts: Cast[] = [
    {
      registrationResponsible: '',
      nameResponsibleCast: '',
      officeResponsibleCast: '',
      scaleDate: '',
      sector: '',
      shift: '',
      withoutRestriction: 0,
      withRestriction: 0,
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private responsibleService: ResponsiblesService,
  ) {
    this.responsible.registration =
      this.activatedRoute.snapshot.queryParams['registration'];
    this.responsible.nameResponsible =
      this.activatedRoute.snapshot.queryParams['nameResponsible'];
    this.responsible.role = this.activatedRoute.snapshot.queryParams['role'];

    this.listCastReportForm = this.formBuilder.group({
      castDate: [/*new Date().toLocaleDateString('pt-BR')*/ '26/02/2024', Validators.required],
      shift: ['Manhã', Validators.required],
    });

    this.listCastRegisterForm = this.formBuilder.group({
      registrationResponsible: ['', Validators.required],
    });
  }

  public castReport() {
    const castDateReport = this.listCastReportForm.getRawValue().castDate!;
    const shiftReport = this.listCastReportForm.getRawValue().shift!;
    this.responsibleService
    .responsibleReportCast(castDateReport, shiftReport)
    .then((responsible: Responsible) => {
      if(this.listCastReportForm.valid){
      this.router.navigate(['report'], {
        queryParams: {
          registration: responsible.registration,
          nameResponsible: responsible.nameResponsible,
          office: responsible.office,
          sector: responsible.sector,
          role: responsible.role,
          shift: shiftReport,
          dateReport: castDateReport
        },
      });}
    });
  }

  public castRegister() {
    this.responsibleService
      .responsibleRegisterCast(
        this.listCastRegisterForm.getRawValue().registrationResponsible!
      )
      .then((responsible: Responsible) => {
        if(this.listCastRegisterForm.valid){
        this.router.navigate(['register'], {
          queryParams: {
            registration: responsible.registration,
            nameResponsible: responsible.nameResponsible,
            office: responsible.office,
            sector: responsible.sector,
            role: responsible.role,
            shift: responsible.shift,
            dateReport: this.listCastReportForm.getRawValue().castDate!
          },
        });}
      });
  }

  responsibleList() {
    this.router.navigate(['responsible-list'], {
      queryParams: {
        nameResponsible: this.responsible.nameResponsible,
        role: this.responsible.role

      },
    });
  }
}
