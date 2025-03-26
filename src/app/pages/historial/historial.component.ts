import { Component } from '@angular/core';
import { LayoutService } from '../../utils/layout.service';

@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
})
export class HistorialComponent {

   constructor(private readonly layoutService: LayoutService) {
    this.layoutService.messageSource.next('Historial');
    }

}
