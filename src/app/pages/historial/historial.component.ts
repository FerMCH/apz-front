import { Component } from '@angular/core';
import { LayoutService } from '../../utils/layout.service';
import { Store } from '@ngrx/store';
import { TittleActions } from '../../store/products/tittle.actions';

@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
})
export class HistorialComponent {

   constructor(private readonly layoutService: LayoutService,
       private readonly store: Store<{tittle: string}>
       ) {
         this.store.dispatch(TittleActions.updateLayout({
           tittle: 'Historial'
         }));
    this.layoutService.messageSource.next('Historial');
    }

}
