import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { collection, getDocs } from 'firebase/firestore';
import { CastsService } from '../../../../services/casts.service';
import { Cast } from '../../../../interfaces/cast';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AngularMaterialModule, NgFor, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {

  casts: Cast[] = [{
    registrationResponsible: '',
    scaleDate: '',
    shift: '',
    withoutRestriction: 0,
    withRestriction: 0
  }];

  constructor(private router: Router, private castsService: CastsService) {
  this.castsService.listCasts().then((casts: Cast[]) => {
    this.casts = casts;

  console.log(this.casts)
  })
  }

  displayedColumns: string[] = [
    'gar',
    'semRestricoes',
    'comRestricoes',
    'totalGerencia',
  ];

  listCasts(){

  }

  getTotalCostCom() {}
  getTotalCostSem() {}

  voltarParaInclusao() {
    this.router.navigate(['register']);
  }
}
