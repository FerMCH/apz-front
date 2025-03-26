import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  messageSource = new BehaviorSubject<string>('');
  currentMessage$ = this.messageSource.asObservable();

}
