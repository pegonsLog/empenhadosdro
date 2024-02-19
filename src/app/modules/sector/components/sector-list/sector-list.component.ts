import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/angular-material/angular-material';
import { Sector } from '../../../../interfaces/sector';
import { SectorsService } from '../../../../services/sectors.service';

@Component({
  selector: 'app-sector-list',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './sector-list.component.html',
  styleUrl: './sector-list.component.scss',
})
export class SectorListComponent {
  sectors: Sector[] = [
    {
      nameSector: '',
    },
  ];

  sector: Sector = {
    nameSector: '',
  };

  displayedColumns: string[] = [
    'sector',
  ];

  constructor(private sectorsService: SectorsService) {
    this.sectorsService.listSectors().then((sectors: Sector[]) => {
      this.sectors = sectors;

      console.log(this.sectors);
    });
  }
}
