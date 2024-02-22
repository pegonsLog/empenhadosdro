import { CommonModule, NgFor } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
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
    scaleDate: '',
    sector: '',
    shift: '',
    withoutRestriction: 0,
    withRestriction: 0,
  };

  public casts: Cast[] = [
    {
      registrationResponsible: '',
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

  constructor(private router: Router, private castsService: CastsService) {
    this.castsService.listCasts().then((casts: Cast[]) => {
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
    this.router.navigate(['home']);
  }
}
