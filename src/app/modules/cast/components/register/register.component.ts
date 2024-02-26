import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Responsible } from '../../../../interfaces/responsible';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AngularMaterialModule, NgxMaskDirective, FormsModule, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  public formCastRegister: FormGroup;
  public maskDate = 'd0/M0/0000';
  public existData: boolean = false;
  public registrationResponsible: string = ''

  responsibles: Responsible[] = [
    {
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
    },
  ];

  constructor(private router: Router, private fb: FormBuilder, private responsiblesService: ResponsiblesService, private activatedRoute: ActivatedRoute) {

    const registration = this.activatedRoute.snapshot.queryParams['registration'];
    const nameResponsible = this.activatedRoute.snapshot.queryParams['nameResponsible'];
    const office = this.activatedRoute.snapshot.queryParams['office'];
    const sector = this.activatedRoute.snapshot.queryParams['sector'];
    const shift = this.activatedRoute.snapshot.queryParams['shift'];

    this.formCastRegister = fb.group({
      castDate: [new Date().toLocaleDateString('pt-BR'), Validators.required],
      registrationResponsible: [registration, Validators.required],
      nameResponsible: [nameResponsible, Validators.required],
      officeResponsible: [office, Validators.required],
      sectorResponsible: [sector, Validators.required],
      shiftResponsible: [shift, Validators.required],
      withoutRestriction: ['', Validators.required],
      withRestriction: ['', Validators.required],
    })

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


  }

  report() {
    this.router.navigate(['report']);
  }

  close() {
    // this.router.navigate(['']);
  }
}
