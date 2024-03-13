import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from '../../../../interfaces/responsible';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';

@Component({
  selector: 'app-responsible-update',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './responsible-update.component.html',
  styleUrl: './responsible-update.component.scss',
})
export class ResponsibleUpdateComponent {
  public existData: boolean = false;
  public id: string = '';
  responsibles: Responsible[] = [
    {
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: '',
      id: '',
    },
  ];

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

  public sectors = [
    'GAOPE',
    'GARBO',
    'GARNE',
    'GARNP',
    'GARVN',
    'GEACE',
    'DRO',
  ];
  public shifts = ['Manhã', 'Tarde', 'Admin', 'Mad.'];
  public offices = [
    'Coord.',
    'Ger.',
    'Adm.',
    'Superv.',
    'Téc.',
    'Fisc.',
    'Dir',
  ];
  public roles = ['adm', 'user', 'query'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responsiblesService: ResponsiblesService,
    private fb: FormBuilder
  ) {
    this.responsiblesService
      .listResponsibles()
      .then((responsibles: Responsible[]) => {
        if (responsibles) {
          this.responsibles = responsibles.sort((a, b) =>
            a.nameResponsible.localeCompare(b.nameResponsible)
          );
          this.existData = true;
          this.responsibles = responsibles;
        }
      });

    this.id = this.activatedRoute.snapshot.queryParams['id'];

    this.responsiblesService.oneResponsible(this.id).then((responsible: Responsible) => (this.responsible = responsible));
  }

  public updateResponsible(id: string) {
    const responsibleUpdate: Responsible = {
      id: this.responsible.id,
      registration: this.responsible.registration,
      nameResponsible: this.responsible.nameResponsible,
      office: this.responsible.office,
      sector: this.responsible.sector,
      shift: this.responsible.shift,
      password: this.responsible.password,
      role: this.responsible.role,
    };

    this.responsiblesService
      .updateResponsible(responsibleUpdate)
      .then(() => this.router.navigate(['responsible-list']));
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
