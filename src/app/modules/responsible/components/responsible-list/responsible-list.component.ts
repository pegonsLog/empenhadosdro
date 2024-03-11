import { Component } from '@angular/core';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Responsible } from '../../../../interfaces/responsible';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { ActivatedRoute, Router } from '@angular/router';
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
      id: '',
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: ''
    },
  ];

  responsible: Responsible = {
    id: '',
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: ''
  };

  displayedColumns: string[] = [
    'registration',
    'responsible-name',
    'office',
    'sector',
    'shift',
    'actions',
    'id'
  ];

  constructor(
    private responsiblesService: ResponsiblesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  goToAdd() {
    this.router.navigate(['responsible-form'])}

  goToUpdate(id: string) {

    this.responsiblesService.updateResponsible(id).then((data: Responsible) => {
      this.responsible = data;
    });



    // this.router.navigate(['responsible-form'], {
    //   queryParams: {
    //     id: this.responsible.id,
    //     resgistration: this.responsible.registration,
    //     name: this.responsible.nameResponsible,
    //     office: this.responsible.office,
    //     sector: this.responsible.sector,
    //     shift: this.responsible.shift,
    //     password: this.responsible.password,
    //     role: this.responsible.role,
    //     idType: this.responsible.id
    //   },
    // });
  }

  backToHome() {
    this.clear();
    this.router.navigate(['home'], {
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
