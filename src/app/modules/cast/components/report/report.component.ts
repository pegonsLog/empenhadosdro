import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from '../../../../interfaces/cast';
import { Responsible } from '../../../../interfaces/responsible';
import { CastsService } from '../../../../services/casts.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { LocalStorageService } from '../../../../services/local.storage.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  public existData: boolean = false;
  public typeForm: boolean = true;

  public responsible: Responsible = {
    id: '',
    registration: '',
    nameResponsible: '',
    office: '',
    sector: '',
    shift: '',
    password: '',
    role: '',
  };

  public cast: Cast = {
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

  public casts: Cast[] = [
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
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.dateReport = this.localStorageService.getItem('castDateReport');
    this.shift = this.localStorageService.getItem('shift');

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
    this.router.navigate(['register']);
  }

  goToUpdate(id: string) {
    this.castsService.updateCast(id).then((data: Cast) => {
      this.router.navigate(['update-cast'], {
        queryParams: {
          id: data.id,
        },
      });
    });
  }

  backToHome() {
    this.clear();
    this.router.navigate(['home']);
  }

  clear() {
    while (this.casts.length) {
      this.casts.pop();
    }
  }
}
