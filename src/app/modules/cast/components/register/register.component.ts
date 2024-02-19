import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Router, TitleStrategy } from '@angular/router';
import { SectorsService } from '../../../../services/sectors.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private router: Router) {}

  report() {
    this.router.navigate(['report']);
  }

  close() {
    this.router.navigate(['']);
  }
}
