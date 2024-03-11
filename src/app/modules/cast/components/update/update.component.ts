import { Component } from '@angular/core';
import { Cast } from '../../../../interfaces/cast';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Responsible } from '../../../../interfaces/responsible';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CastsService } from '../../../../services/casts.service';
import { LocalStorageService } from '../../../../services/local.storage.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [AngularMaterialModule,
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
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
    private castsService: CastsService,
    private localStorageService: LocalStorageService
  ) {
    this.responsible.registration =
      this.localStorageService.getItem('registration');
    this.responsible.nameResponsible =
      this.localStorageService.getItem('nameResponsible');
    this.responsible.office = this.localStorageService.getItem('office');
    this.responsible.sector = this.localStorageService.getItem('sector');
    this.responsible.shift = this.localStorageService.getItem('shift');
    this.responsible.role = this.localStorageService.getItem('role');

    const id = this.activatedRoute.snapshot.queryParams['id'];

    this.castsService.updateCast(id).then((cast: Cast)=> console.log(cast))


      this.formCastRegister = this.fb.group({
        castDate: [this.cast.scaleDate, Validators.required],
        registrationResponsible: [this.cast.registration, Validators.required],
        nameResponsible: [this.cast.nameResponsibleCast, Validators.required],
        officeResponsible: [this.cast.officeResponsibleCast, Validators.required],
        sectorResponsible: [this.cast.sector, Validators.required],
        shiftResponsible: [this.cast.shift, Validators.required],
        withoutRestriction: [this.cast.withRestriction, Validators.required],
        withRestriction: [this.cast.withoutRestriction, Validators.required],
      });

    // this.responsiblesService
    //   .listResponsibles()
    //   .then((responsibles: Responsible[]) => {
    //     if (responsibles) {
    //       this.responsibles = responsibles.sort((a, b) =>
    //         a.nameResponsible.localeCompare(b.nameResponsible)
    //       );
    //       (this.existData = true), (this.responsibles = responsibles);
    //     }
    //   });

    // this.castsService
    //   .listCasts(this.dateReport, this.responsible.shift)
    //   .then((casts: Cast[]) => {
    //     if (casts) {
    //       this.casts = casts.sort((a, b) => a.sector.localeCompare(b.sector));
    //       (this.existData = true), (this.casts = casts);
    //     }
    //   });
  }

  public report() {
    this.clear();
    this.router.navigate(['home']);
  }

  public updateCast() {
    const cast: Cast = {
      scaleDate: this.formCastRegister.getRawValue().castDate,
      registration: this.formCastRegister.getRawValue().registrationResponsible,
      nameResponsibleCast: this.formCastRegister.getRawValue().nameResponsible,
      officeResponsibleCast:
        this.formCastRegister.getRawValue().officeResponsible,
      sector: this.formCastRegister.getRawValue().sectorResponsible,
      shift: this.formCastRegister.getRawValue().shiftResponsible,
      withoutRestriction:
        this.formCastRegister.getRawValue().withoutRestriction,
      withRestriction: this.formCastRegister.getRawValue().withRestriction,
      id: '',
    };

    this.castsService.addCast(cast).then(() => '');
  }

  backToHome() {
    this.clear();
    this.router.navigate(['home']);
  }

  clear() {
    while (this.casts.length) {
      this.casts.pop();
    }
    while (this.responsibles.length) {
      this.responsibles.pop();
    }
  }
}
