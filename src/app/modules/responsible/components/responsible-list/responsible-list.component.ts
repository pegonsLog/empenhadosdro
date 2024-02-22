import { Component } from '@angular/core';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Responsible } from '../../../../interfaces/responsible';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responsible-list',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './responsible-list.component.html',
  styleUrl: './responsible-list.component.scss',
})
export class ResponsibleListComponent {
  public existData: boolean = false;
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

  constructor(
    private responsiblesService: ResponsiblesService,
    private router: Router
  ) {
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

  goToAdd() {
    this.router.navigate(['responsible-form']);
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
