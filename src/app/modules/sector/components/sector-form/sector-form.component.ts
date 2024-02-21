import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sector-form',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './sector-form.component.html',
  styleUrl: './sector-form.component.scss'
})
export class SectorFormComponent {
  constructor(private router: Router) {}

  sectorList() {
    this.router.navigate(['sector-list']);
  }

  close() {
    this.router.navigate(['']);
  }
}