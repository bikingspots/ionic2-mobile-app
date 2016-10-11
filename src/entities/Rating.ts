import {Component} from '@angular/core';

@Component({
  selector: 'rating',
  inputs: ['rate'],
  template: `
    <span *ngFor="let score of range">
         <ion-icon name="leaf" [style.color]="(score <= rate) ? '#006600' : '#dddddd'"></ion-icon>
    </span>
  `
})

export class Rating {
  private range:Array<number> = [1,2,3,4,5];
  private rate:number;
}