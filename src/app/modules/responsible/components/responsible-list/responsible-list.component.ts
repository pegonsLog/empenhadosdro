import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ResponsiblesService } from '../../../../services/responsibles.service';
import { Responsible } from '../../../../interfaces/responsible';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-responsible-list',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './responsible-list.component.html',
  styleUrl: './responsible-list.component.scss',
})
export class ResponsibleListComponent implements OnInit, OnDestroy {
  public existData: boolean = false;

  public subscription: Subscription = new Subscription();

  responsibles: Responsible[] = [
    {
      id: '',
      registration: '',
      nameResponsible: '',
      office: '',
      sector: '',
      shift: '',
      password: '',
      role: '',
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
    role: '',
  };

  displayedColumns: string[] = [
    'registration',
    'responsible-name',
    'office',
    'sector',
    'shift',
    'role',
    'actions',
    'id',
  ];

  constructor(
    private responsiblesService: ResponsiblesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.responsible.nameResponsible =
      this.activatedRoute.snapshot.queryParams['nameResponsible'];
    this.responsible.role = this.activatedRoute.snapshot.queryParams['role'];
  }

  ngOnInit(): void {
    this.responsiblesService
      .listResponsibles()
      .then((responsibles: Responsible[]) => {
        if (responsibles) {
          this.responsibles = responsibles.sort((a, b) =>
            a.nameResponsible.localeCompare(b.nameResponsible)
          );
          this.existData = true;
          this.responsibles = responsibles;
        }
      });
  }

  goToAdd() {
    this.router.navigate(['responsible-form']);
  }

  goToUpdate(id: string) {
    this.responsiblesService.oneResponsible(id).then((data: Responsible) => {
      this.router.navigate(['responsible-update'], {
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
          this.responsiblesService.removeResponsible(id);
          location.reload();
        }
      });
  }

  backToHome() {
    this.router.navigate(['home'], {
      queryParams: {
        role: this.responsible.role,
        nameResponsible: this.responsible.nameResponsible,
      },
    });
  }

  ngOnDestroy(): void {
    while (this.responsibles.length) {
      this.responsibles.pop();
    }
    this.subscription.unsubscribe();
  }
}
