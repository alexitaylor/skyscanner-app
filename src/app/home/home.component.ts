import { Component, OnInit } from '@angular/core';

import { QuoteService } from './quote.service';
import { SkyScannerApiService } from '@app/shared/service/skysanner-api.service';
import { IDateModel, IQuotesResult, QuotesResult } from '@app/home/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isToggleActive = true;
  isSearchingFlights: boolean;

  departureDateQuery: string;
  returnDateQuery: string;

  searchOriginPlaceQuery: string;
  searchDestinationPlaceQuery: string;

  quotesList: IQuotesResult = new QuotesResult([], [], [], []);

  constructor(
    private quoteService: QuoteService,
    private skyscannerApi$: SkyScannerApiService,
  ) {}

  ngOnInit() {
  }

  handleOriginPlaceQuery(query: string) {
    this.searchOriginPlaceQuery = query;
  }

  handleDestinationPlaceQuery(query: string) {
    this.searchDestinationPlaceQuery = query;
  }

  handleDepartureDate(date: string) {
    this.departureDateQuery = date;
  }

  handleReturnDate(date: string) {
    this.returnDateQuery = date;
  }

  // Search Flights
  searchFlights() {
    this.isSearchingFlights = true;
    const params = {
      country: 'US',
      currency: 'USD',
      locale: 'en-US',
      originplace: this.searchOriginPlaceQuery,
      destinationplace: this.searchDestinationPlaceQuery,
      outboundpartialdate: this.departureDateQuery,
      inboundpartialdate: this.returnDateQuery,
    };
    this.skyscannerApi$.getBrowseQuotes(params).subscribe(
      (res: any) => {
        this.quotesList = res;
        this.isSearchingFlights = false;
      });
  }

  formatDate(dateObj: IDateModel) {
    const month = parseInt(dateObj.month, 10) <= 9 ? `0${dateObj.month}` : `${dateObj.month}`;
    const day = parseInt(dateObj.day, 10) <= 9 ? `0${dateObj.day}` : `${dateObj.day}`;
    return `${dateObj.year}-${month}-${day}`;
  }
}
