import { Component, OnInit } from '@angular/core';

import { QuoteService } from './quote.service';
import { SkyScannerApiService } from '@app/shared/service/skysanner-api.service';
import { fromEvent } from 'rxjs';
import { map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { IDateModel, IPlace, IQuotesResult, QuotesResult } from '@app/home/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isToggleActive = true;
  departureDateModel: IDateModel;
  returnDateModel: IDateModel;

  departureDateQuery: string;
  returnDateQuery: string;

  originPlaceList: IPlace[];
  isLoadingOriginPlace: boolean;
  searchOriginPlaceQuery: string;

  destinationPlaceList: IPlace[];
  isLoadingDestinationPlace: boolean;
  searchDestinationPlaceQuery: string;

  quotesList: IQuotesResult = new QuotesResult([], [], [], []);

  constructor(
    private quoteService: QuoteService,
    private skyscannerApi$: SkyScannerApiService,
  ) {}

  ngOnInit() {
    this.searchOriginPlace();
    this.searchDestinationPlace();
  }

  // Search Origin Place
  searchOriginPlace() {
    const $searchOriginPlace = document.getElementById('originplace');

    const searchOriginPlace$ = fromEvent($searchOriginPlace, 'input').pipe(
      map((event: any) => {
        this.isLoadingOriginPlace = true;
        const query = event.target.value;
        this.searchOriginPlaceQuery = query;
        if (!query) {
          this.clearSearchOriginPlace();
        }
        return query;
      }),
      filter(query => query),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(query => this.skyscannerApi$.getPlaces(query))
    );

    searchOriginPlace$.subscribe(
      (res: any) => this.onSearchOriginPlaceSuccess(res),
      (err: any) => this.onError(err),
    );
  }

  clearSearchOriginPlace() {
    this.originPlaceList = [];
    this.isLoadingOriginPlace = false;
  }

  onSearchOriginPlaceSuccess(res: any) {
    this.isLoadingOriginPlace = false;
    this.originPlaceList = res.Places;
  }

  selectOriginPlace(item: any) {
    this.searchOriginPlaceQuery = item.PlaceId;
  }

  // Search Destination Place
  searchDestinationPlace() {
    const $searchDestinationPlace = document.getElementById('destinationplace');

    const searchDestinationPlace$ = fromEvent($searchDestinationPlace, 'input').pipe(
      map((event: any) => {
        this.isLoadingDestinationPlace = true;
        const query = event.target.value;
        this.searchDestinationPlaceQuery = query;
        if (!query) {
          this.clearSearchDestinationPlace();
        }
        return query;
      }),
      filter(query => query),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(query => this.skyscannerApi$.getPlaces(query))
    );

    searchDestinationPlace$.subscribe(
      (res: any) => this.onSearchDestinationPlaceSuccess(res),
    );
  }

  clearSearchDestinationPlace() {
    this.destinationPlaceList = [];
    this.isLoadingDestinationPlace = false;
  }

  onSearchDestinationPlaceSuccess(res: any) {
    this.isLoadingDestinationPlace = false;
    this.destinationPlaceList = res.Places;
  }

  selectDestinationPlace(item: any) {
    this.searchDestinationPlaceQuery = item.PlaceId;
  }

  onError(error: any) {
    this.isLoadingOriginPlace = false;
    this.isLoadingDestinationPlace = false;
    throw error;
  }

  // Search Flights
  searchFlights() {
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
      (res: any) => this.quotesList = res,
      );
  }

  formatDate(dateObj: IDateModel) {
    const month = parseInt(dateObj.month, 10) <= 9 ? `0${dateObj.month}` : `${dateObj.month}`;
    const day = parseInt(dateObj.day, 10) <= 9 ? `0${dateObj.day}` : `${dateObj.day}`;
    return `${dateObj.year}-${month}-${day}`;
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
