import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material';
import { Transaction } from '../../interface/transaction';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  displayedColumns: string[] = ['gar', 'sem_restricoes', 'com_restricoes'];
  transactions: Transaction[] = [
    {gar: 'GEACE', sem_restricoes: 4, com_restricoes: 2},
    {gar: 'GARBO', sem_restricoes: 5, com_restricoes: 3},
    {gar: 'GARNE', sem_restricoes: 2, com_restricoes: 7},
    {gar: 'GARNP', sem_restricoes: 4, com_restricoes: 1},
    {gar: 'GARVN', sem_restricoes: 25, com_restricoes: 4},
    {gar: 'GEAOP', sem_restricoes: 15, com_restricoes: 6},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCostCom() {
    return this.transactions.map(t => t.com_restricoes).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostSem() {
    return this.transactions.map(t => t.sem_restricoes).reduce((acc, value) => acc + value, 0);
  }
}
