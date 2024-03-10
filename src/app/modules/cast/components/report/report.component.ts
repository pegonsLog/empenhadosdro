import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from '../../../../interfaces/cast';
import { Responsible } from '../../../../interfaces/responsible';
import { CastsService } from '../../../../services/casts.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  public existData: boolean = false;
  public typeForm: string = '';

  public responsible: Responsible = {
    id: '',
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: ''
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

  displayedColumns: string[] = [
    'id',
    'gar',
    'semRestricoes',
    'comRestricoes',
    'totalGerencia',
    'actions',
  ];

  public dateReport: string = '';
  public shift: string = '';

  constructor(
    private router: Router,
    private castsService: CastsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.responsible.registration =
      this.activatedRoute.snapshot.queryParams['registration'];
    this.responsible.nameResponsible =
      this.activatedRoute.snapshot.queryParams['nameResponsible'];
    this.responsible.office =
      this.activatedRoute.snapshot.queryParams['office'];
    this.responsible.sector =
      this.activatedRoute.snapshot.queryParams['sector'];
    this.responsible.role = this.activatedRoute.snapshot.queryParams['role'];
    this.shift = this.activatedRoute.snapshot.queryParams['shift'];
    this.dateReport = this.activatedRoute.snapshot.queryParams['dateReport'];

    this.castsService
      .listCasts(this.dateReport, this.shift)
      .then((casts: Cast[]) => {
        if (casts) {
          this.casts = casts.sort((a, b) => a.sector.localeCompare(b.sector));
          (this.existData = true), (this.casts = casts);
        }
      });
  }

  getTotalCostCom() {
    return this.casts
      .map((t) => t.withRestriction)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalCostSem() {
    return this.casts
      .map((t) => t.withoutRestriction)
      .reduce((acc, value) => acc + value, 0);
  }

  goToAdd() {
    this.typeForm = 'add';
    this.router.navigate(['register'], {
      queryParams: {
        registration: this.responsible.registration,
        nameResponsible: this.responsible.nameResponsible,
        office: this.responsible.office,
        sector: this.responsible.sector,
        shift: this.shift,
        role: this.responsible.role,
        dateReport: this.dateReport,
        typeForm: this.typeForm
      },
    });
  }

  goToUpdate(id: string) {


    this.castsService.updateCast(id).then((data: Cast) => {
      this.cast = data;
      console.log(data)
    });

    // this.router.navigate(['register'], {
    //   queryParams: {
    //     registration: this.responsible.registration,
    //     nameResponsible: this.responsible.nameResponsible,
    //     office: this.responsible.office,
    //     sector: this.responsible.sector,
    //     shift: this.shift,
    //     role: this.responsible.role,
    //     dateReport: this.dateReport,
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
    while (this.casts.length) {
      this.casts.pop();
    }
  }
}
