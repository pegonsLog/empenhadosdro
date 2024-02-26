import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from '../../../../interfaces/cast';
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
  public cast: Cast = {
    registrationResponsible: '',
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
      registrationResponsible: '',
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
    'gar',
    'semRestricoes',
    'comRestricoes',
    'totalGerencia',
  ];

  public dateReport: string = '';
  public shift: string = '';
  public role: string = '';
  public nameUser: string = '';

  constructor(
    private router: Router,
    private castsService: CastsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.shift = this.activatedRoute.snapshot.queryParams['shift'];
    this.dateReport = this.activatedRoute.snapshot.queryParams['dateReport'];
    this.role = this.activatedRoute.snapshot.queryParams['role'];
    this.nameUser = this.activatedRoute.snapshot.queryParams['nameUser'];

    this.castsService
      .listCasts(this.dateReport, this.shift)
      .then((casts: Cast[]) => {
        if (casts) {
          this.casts = casts.sort((a, b) => a.sector.localeCompare(b.sector));
          (this.existData = true), (this.casts = casts);
        }
      });
  }

  listCasts() {}

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

  backToHome() {
    this.clear();
    this.router.navigate(['home'], {
      queryParams: { role: this.role, userName: this.nameUser },
    });
  }

  clear() {
    while (this.casts.length) {
      this.casts.pop();
    }
  }
}
