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
import { LocalStorageService } from '../../services/local.storage.service';
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

  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
    id: ''
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private responsibleService: ResponsiblesService,
    private localStorageService: LocalStorageService
  ) {
    this.responsible.registration = this.localStorageService.getItem('registration');
    this.responsible.nameResponsible = this.localStorageService.getItem('nameResponsible');
    this.responsible.office = this.localStorageService.getItem('office');
    this.responsible.sector = this.localStorageService.getItem('sector');
    this.responsible.shift = this.localStorageService.getItem('shift');
    this.responsible.role = this.localStorageService.getItem('role');

    this.listCastReportForm = this.formBuilder.group({
      castDate: [/*new Date().toLocaleDateString('pt-BR')*/ '26/02/2024', Validators.required],
      shift: ['Manhã', Validators.required],
    });

    this.listCastRegisterForm = this.formBuilder.group({
      registrationResponsible: [this.responsible.registration, Validators.required]
    });
  }

  public castReport() {
    const castDateReport = this.listCastReportForm.getRawValue().castDate!;
    const shiftReport = this.listCastReportForm.getRawValue().shift!;
    this.responsibleService
    .responsibleReportCast(castDateReport, shiftReport)
    .then(() => {
      if(this.listCastReportForm.valid){
        this.localStorageService.setItem('castDateReport', castDateReport);
      this.router.navigate(['report'])}
    });
  }

  public castRegister() {
    this.responsibleService
      .responsibleRegisterCast(
        this.listCastRegisterForm.getRawValue().registrationResponsible!
      )
      .then((responsible: Responsible) => {
        if(this.listCastRegisterForm.valid){
        this.router.navigate(['register'])}
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

  public close(){
    this.localStorageService.removeItem('registration');
    this.localStorageService.removeItem('nameResponsible');
    this.localStorageService.removeItem('office');
    this.localStorageService.removeItem('sector');
    this.localStorageService.removeItem('shift');
    this.localStorageService.removeItem('role');
    this.localStorageService.removeItem('dateReport');
    this.router.navigate(['']);
  }
}
