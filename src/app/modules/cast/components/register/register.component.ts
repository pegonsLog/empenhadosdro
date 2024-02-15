import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material';
import { Router } from '@angular/router';

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
    this.router.navigate(["report"])
    throw new Error('Method not implemented.');
  }
}
