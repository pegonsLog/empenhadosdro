import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cast } from '../../../../interfaces/cast';
import { Responsible } from '../../../../interfaces/responsible';
import { CastsService } from '../../../../services/casts.service';
import { LocalStorageService } from '../../../../services/local.storage.service';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { ConfirmationDialogComponent } from '../../../../shared/dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  public existData: boolean = false;
  public typeForm: boolean = true;

  public subscription: Subscription = new Subscription();

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
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
  ) {

    this.dateReport = this.localStorageService.getItem('castDateReport');
    this.shift = this.localStorageService.getItem('shift');

  }

  ngOnInit(): void {

    this.castsService
      .listCasts(this.dateReport, this.shift)
      .then((casts: Cast[]) => {
        if (casts.length) {
          this.casts = casts.sort((a, b) => a.sector.localeCompare(b.sector));
          this.existData = true;
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
    this.castsService.oneCast(id).then((data: Cast) => {
      this.router.navigate(['update-cast'], {
        queryParams: {
          id: data.id,
        },
      });
    });
  }

  goToRemove(id: string) {
    const dialogReference = this.dialog.open(ConfirmationDialogComponent);
    this.subscription = dialogReference
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.castsService.removeCast(id).then(() => console.log('Removido'));
        }
      });
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
