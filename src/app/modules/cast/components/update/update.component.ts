import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ICast } from '../../../../interfaces/cast';
import { IResponsible } from '../../../../interfaces/responsible';
import { CastsService } from '../../../../services/casts.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [AngularMaterialModule, NgxMaskDirective, FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent {
  public maskDate = 'd0/M0/0000';
  public existData: boolean = false;
  public registrationResponsible: string = '';
  public dateReport: string = '';
  public id: string = '';

  public responsible: IResponsible = {
    id: '',
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
  };

  public cast: ICast = {
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

  public casts: ICast[] = [
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
    private activatedRoute: ActivatedRoute,
    private castsService: CastsService,
  ) {
    this.responsible.registration =
      localStorage.getItem('registration')!;
    this.responsible.nameResponsible =
      localStorage.getItem('nameResponsible')!;
    this.responsible.office = localStorage.getItem('office')!;
    this.responsible.sector = localStorage.getItem('sector')!;
    this.responsible.shift = localStorage.getItem('shift')!;
    this.responsible.role = localStorage.getItem('role')!;

    this.id = this.activatedRoute.snapshot.queryParams['id'];

    this.castsService.oneCast(this.id).then((cast: ICast) => (this.cast = cast));
  }

  public report() {
    this.router.navigate(['home']);
  }

  public updateCast(id: string) {
    const castUpdate: ICast = {
      id: this.cast.id,
      scaleDate: this.cast.scaleDate,
      registration: this.cast.registration,
      nameResponsible: this.cast.nameResponsible,
      officeResponsible: this.cast.officeResponsible,
      sector: this.cast.sector,
      shift: this.cast.shift,
      withoutRestriction: this.cast.withoutRestriction,
      withRestriction: this.cast.withRestriction,
    };

    this.castsService
      .updateCast(castUpdate)
      .then(() => this.router.navigate(['report']));
  }
}
