import { Component, OnDestroy } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponsible } from '../../../../interfaces/responsible';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-responsible-form',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './responsible-form.component.html',
  styleUrl: './responsible-form.component.scss',
})
export class ResponsibleFormComponent implements OnDestroy {
  public formResponsible: FormGroup;
  public existData: boolean = false;
  responsibles: IResponsible[] = [
    {
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: '',
      id: ''
    },
  ];

  responsible: IResponsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
    id: ''
  };

  public sectors = ['GAOPE', 'GARBO', 'GARNE', 'GARNP', 'GARVN', 'GEACE', 'DRO'];
  public shifts = ['Manhã', 'Tarde', 'Admin', 'Mad.'];
  public offices = ['Coord.', 'Ger.', 'Adm.', 'Superv.', 'Téc.', 'Fisc.', 'Dir'];
  public roles = ['adm', 'user', 'query'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responsiblesService: ResponsiblesService,
    private fb: FormBuilder
  ) {

    this.responsiblesService
      .listResponsibles()
      .then((responsibles: IResponsible[]) => {
        if (responsibles) {
          this.responsibles = responsibles.sort((a, b) =>
            a.nameResponsible.localeCompare(b.nameResponsible)
          );
          (this.existData = true), (this.responsibles = responsibles);
        }
      });

    this.formResponsible = fb.group({
      id: [this.responsible.id, Validators.required],
      registration: [this.responsible.registration, Validators.required],
      name: [this.responsible.nameResponsible, Validators.required],
      office: [this.responsible.office, Validators.required],
      sector: [this.responsible.sector, Validators.required],
      shift: [this.responsible.shift, Validators.required],
      password: [this.responsible.password, Validators.required],
      role: [this.responsible.role, Validators.required],
    });
  }

  public newResponsible() {
    const responsible: IResponsible = {
      registration: this.formResponsible.getRawValue().registration,
      nameResponsible: this.formResponsible.getRawValue().name,
      office: this.formResponsible.getRawValue().office,
      sector: this.formResponsible.getRawValue().sector,
      shift: this.formResponsible.getRawValue().shift,
      password: this.formResponsible.getRawValue().password,
      role: this.formResponsible.getRawValue().role,
      id: ''
    };

    this.responsiblesService.addResponsible(responsible).then(() => {
      this.formResponsible.reset(), this.router.navigate(['responsible-list'])
    });
  }

  backToHome() {
    this.router.navigate(['home'])}


  ngOnDestroy(): void {
    while(this.responsibles.length){
      this.responsibles.pop();
    }
  }
}
