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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cast } from '../../interfaces/cast';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material';
import { ResponsiblesService } from '../../services/responsibles.service';
import { Responsible } from '../../interfaces/responsible';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public nameUser: string = '';
  public role: string = '';
  public maskDate = 'd0/M0/0000';

  public listCastReportForm: FormGroup;
  public listCastRegisterForm: FormGroup;

  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: ''
  }

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
    private responsibleService: ResponsiblesService
  ) {
    this.nameUser = this.activatedRoute.snapshot.queryParams['userName'];
    this.role = this.activatedRoute.snapshot.queryParams['role'];

    this.listCastReportForm = this.formBuilder.group({
      castDate: [new Date().toLocaleDateString('pt-BR'), Validators.required],
      shift: ['', Validators.required],
    });

    this.listCastRegisterForm = this.formBuilder.group({
      registrationResponsible: ['', Validators.required],
    });
  }

  async castReport() {
    const castDateReport = this.listCastReportForm.getRawValue().castDate!;
    const shiftReport = this.listCastReportForm.getRawValue().shift!;
    if (this.listCastReportForm.valid) {
      this.router.navigate(['report'], {
        queryParams: {
          dateReport: castDateReport,
          shift: shiftReport,
          role: this.role,
          nameUser: this.nameUser,
        },
      });
    }
  }

  castRegister() {
    this.responsibleService.responsibleRegisterCast(
      this.listCastRegisterForm.getRawValue().registrationResponsible!
    ).then((responsible: Responsible) => {

    this.router.navigate(['register'], {
      queryParams: {
        registration: responsible.registration,
        nameResponsible: responsible.nameResponsible,
        office: responsible.office,
        sector: responsible.sector,
        shift: responsible.shift
      },
    });
  })
}

  responsibleList() {
    this.router.navigate(['responsible-list']);
  }
  responsibleForm() {
    this.router.navigate(['responsible-form']);
  }
  userList() {
    this.router.navigate(['user-list']);
  }
  userForm() {
    this.router.navigate(['user-form']);
  }
  sectorList() {
    this.router.navigate(['sector-list']);
  }
  sectorForm() {
    this.router.navigate(['sector-form']);
  }
}
