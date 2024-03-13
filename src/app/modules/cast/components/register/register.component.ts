import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cast } from '../../../../interfaces/cast';
import { Responsible } from '../../../../interfaces/responsible';
import { CastsService } from '../../../../services/casts.service';
import { LocalStorageService } from '../../../../services/local.storage.service';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AngularMaterialModule,
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public formCastRegister: FormGroup;
  public maskDate = 'd0/M0/0000';
  public existData: boolean = false;
  public registrationResponsible: string = '';
  public dateReport: string = '';

  public responsible: Responsible = {
    id: '',
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
  };

  public cast: Cast = {
    id: '',
    registration: '',
    nameResponsible: '',
    officeResponsible: '',
    scaleDate: '',
    sector: '',
    shift: '',
    withoutRestriction: 0,
    withRestriction: 0,
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

  responsibles: Responsible[] = [
    {
      id: '',
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: '',
    },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private responsiblesService: ResponsiblesService,
    private castsService: CastsService,
    private localStorageService: LocalStorageService,
  ) {
    this.responsible.registration =
      this.localStorageService.getItem('registration');
    this.responsible.nameResponsible =
      this.localStorageService.getItem('nameResponsible');
    this.responsible.office = this.localStorageService.getItem('office');
    this.responsible.sector = this.localStorageService.getItem('sector');
    this.responsible.shift = this.localStorageService.getItem('shift');
    this.responsible.role = this.localStorageService.getItem('role');

    this.formCastRegister = this.fb.group({
      castDate: ['', Validators.required],
      registrationResponsible: [
        this.responsible.registration,
        Validators.required,
      ],
      nameResponsible: [this.responsible.nameResponsible, Validators.required],
      officeResponsible: [this.responsible.office, Validators.required],
      sectorResponsible: [this.responsible.sector, Validators.required],
      shiftResponsible: [this.responsible.shift, Validators.required],
      withoutRestriction: [0, Validators.required],
      withRestriction: [0, Validators.required],
    });

    this.responsiblesService
      .listResponsibles()
      .then((responsibles: Responsible[]) => {
        if (responsibles) {
          this.responsibles = responsibles.sort((a, b) =>
            a.nameResponsible.localeCompare(b.nameResponsible)
          );
          (this.existData = true), (this.responsibles = responsibles);
        }
      });

    this.castsService
      .listCasts(this.dateReport, this.responsible.shift)
      .then((casts: Cast[]) => {
        if (casts) {
          this.casts = casts.sort((a, b) => a.sector.localeCompare(b.sector));
          (this.existData = true), (this.casts = casts);
        }
      });
  }

  public report() {
    this.router.navigate(['home']);
  }

  public newCast() {
    const cast: Cast = {
      scaleDate: this.formCastRegister.getRawValue().castDate,
      registration: this.formCastRegister.getRawValue().registrationResponsible,
      nameResponsible: this.formCastRegister.getRawValue().nameResponsible,
      officeResponsible: this.formCastRegister.getRawValue().officeResponsible,
      sector: this.formCastRegister.getRawValue().sectorResponsible,
      shift: this.formCastRegister.getRawValue().shiftResponsible,
      withoutRestriction:
        this.formCastRegister.getRawValue().withoutRestriction,
      withRestriction: this.formCastRegister.getRawValue().withRestriction,
      id: '',
    };

    this.castsService.addCast(cast).then(() => '');
    this.router.navigate(['report']);
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
