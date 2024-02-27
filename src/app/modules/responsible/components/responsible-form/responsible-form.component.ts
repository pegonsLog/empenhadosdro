import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from '../../../../interfaces/responsible';
import { ResponsiblesService } from '../../../../services/responsibles.service';

@Component({
  selector: 'app-responsible-form',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './responsible-form.component.html',
  styleUrl: './responsible-form.component.scss',
})
export class ResponsibleFormComponent {
  public existData: boolean = false;
  responsibles: Responsible[] = [
    {
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: '',
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
  };

  public sectors = ['GAOPE', 'GARBO', 'GARNE', 'GARNP', 'GARVN', 'GEACE'];
  public shifts = ['Manhã', 'Tarde', 'Madrugada'];
  public offices = ['Coordenador', 'Supervisor', 'Gerente'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responsiblesService: ResponsiblesService
  ) {
    this.responsible.nameResponsible =
      this.activatedRoute.snapshot.queryParams['nameResponsible'];
    this.responsible.role = this.activatedRoute.snapshot.queryParams['role'];

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

  addResponsible() {
    this.router.navigate(['']);
  }

  backToHome() {
    this.clear();
    this.router.navigate(['responsible-list'], {
      queryParams: {
        role: this.responsible.role,
        nameResponsible: this.responsible.nameResponsible,
      },
    });
  }

  clear() {
    while (this.responsibles.length) {
      this.responsibles.pop();
    }
  }
}
