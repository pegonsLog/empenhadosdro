import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsible-form',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './responsible-form.component.html',
  styleUrl: './responsible-form.component.scss'
})
export class ResponsibleFormComponent {

  constructor(private router: Router) {}

  report() {
    this.router.navigate(['responsible-list']);
  }

  close() {
    this.router.navigate(['']);
  }
}
