import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material';
import { Transaction } from '../../interface/transaction';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  constructor(private router: Router) {}
  displayedColumns: string[] = [
    'gar',
    'semRestricoes',
    'comRestricoes',
    'totalGerencia',
  ];
  transactions: Transaction[] = [
    { gar: 'GEACE', semRestricoes: 4, comRestricoes: 2 },
    { gar: 'GARBO', semRestricoes: 5, comRestricoes: 3 },
    { gar: 'GARNE', semRestricoes: 2, comRestricoes: 7 },
    { gar: 'GARNP', semRestricoes: 4, comRestricoes: 1 },
    { gar: 'GARVN', semRestricoes: 25, comRestricoes: 4 },
    { gar: 'GEAOP', semRestricoes: 15, comRestricoes: 6 },
  ];

  /** Gets the total cost of all transactions. */
  getTotalCostCom() {
    return this.transactions
      .map((t) => t.comRestricoes)
      .reduce((acc, value) => acc + value, 0);
  }
  getTotalCostSem() {
    return this.transactions
      .map((t) => t.semRestricoes)
      .reduce((acc, value) => acc + value, 0);
  }

  voltarParaInclusao() {
    this.router.navigate(['register']);
    throw new Error('Method not implemented.');
  }
}
