import { Component, Input, OnInit } from '@angular/core';
import { IQuotesResult } from '@app/home/interfaces';

@Component({
  selector: 'app-skyscanner-flights-list',
  templateUrl: './skyscanner-flights-list.component.html',
  styleUrls: ['./skyscanner-flights-list.component.scss']
})
export class SkyscannerFlightsListComponent implements OnInit {
  @Input() quotesList: IQuotesResult;

  constructor() { }

  ngOnInit() {
  }

  getCarrier(id: number) {
    const result = this.quotesList.Carriers.filter(el => el.CarrierId === id);
    return result[0].Name;
  }

  getPlace(id: number) {
    const result = this.quotesList.Places.filter(el => el.PlaceId === id);
    return `${result[0].IataCode} | ${result[0].Name}`;
  }
}
