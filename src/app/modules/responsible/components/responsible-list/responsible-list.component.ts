import { Component } from '@angular/core';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Responsible } from '../../../../interfaces/responsible';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';

@Component({
  selector: 'app-responsible-list',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './responsible-list.component.html',
  styleUrl: './responsible-list.component.scss',
})
export class ResponsibleListComponent {
  responsibles: Responsible[] = [
    {
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
    },
  ];

  responsible: Responsible = {
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
  };

  displayedColumns: string[] = [
    'registration',
    'responsible-name',
    'office',
    'sector',
    'shift',
  ];

  constructor(private responsiblesService: ResponsiblesService) {
    this.responsiblesService
      .listResponsibles()
      .then((responsibles: Responsible[]) => {
        this.responsibles = responsibles.sort((a, b) => a.nameResponsible.localeCompare(b.nameResponsible));;

        console.log(this.responsibles);
      });
  }
}
