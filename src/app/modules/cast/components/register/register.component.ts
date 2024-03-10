import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Responsible } from '../../../../interfaces/responsible';
import { Cast } from '../../../../interfaces/cast';
import { CastsService } from '../../../../services/casts.service';

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
    nameResponsibleCast: '',
    officeResponsibleCast: '',
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
      nameResponsibleCast: '',
      officeResponsibleCast: '',
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
    private activatedRoute: ActivatedRoute,
    private castsService: CastsService
  ) {
    this.responsible.registration =
      this.activatedRoute.snapshot.queryParams['registration'];
    this.responsible.nameResponsible =
      this.activatedRoute.snapshot.queryParams['nameResponsible'];
    this.responsible.office =
      this.activatedRoute.snapshot.queryParams['office'];
    this.responsible.sector =
      this.activatedRoute.snapshot.queryParams['sector'];
    this.responsible.shift = this.activatedRoute.snapshot.queryParams['shift'];
    this.responsible.role = this.activatedRoute.snapshot.queryParams['role'];
    this.dateReport = this.activatedRoute.snapshot.queryParams['dateReport'];

    const typeForm = this.activatedRoute.snapshot.queryParams['typeForm']

    this.formCastRegister = fb.group({
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
    this.clear();
    this.router.navigate(['home'], {
      queryParams: {
        registration: this.responsible.registration,
        nameResponsible: this.responsible.nameResponsible,
        office: this.responsible.office,
        sector: this.responsible.sector,
        shift: this.responsible.shift,
        role: this.responsible.role,
        dateReport: this.dateReport,
      },
    });
  }

  public newCast() {
    const cast: Cast = {
      scaleDate: this.formCastRegister.getRawValue().castDate,
      registration: this.formCastRegister.getRawValue().registrationResponsible,
      nameResponsibleCast: this.formCastRegister.getRawValue().nameResponsible,
      officeResponsibleCast: this.formCastRegister.getRawValue().officeResponsible,
      sector: this.formCastRegister.getRawValue().sectorResponsible,
      shift: this.formCastRegister.getRawValue().shiftResponsible,
      withoutRestriction: this.formCastRegister.getRawValue().withoutRestriction,
      withRestriction: this.formCastRegister.getRawValue().withRestriction,
      id: ''
    };

    this.castsService.addCast(cast).then(() => '');
  }

  public clear() {
    while (this.casts.length) {
      this.casts.pop();
    }
  }

  public close() {
    // this.router.navigate(['']);
  }
}
