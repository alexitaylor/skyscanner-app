import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IPlace } from '@app/home/interfaces';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { SkyScannerApiService } from '@app/shared/service/skysanner-api.service';

@Component({
  selector: 'app-skyscanner-search-place',
  templateUrl: './skyscanner-search-place.component.html',
  styleUrls: ['./skyscanner-search-place.component.scss']
})
export class SkyscannerSearchPlaceComponent implements OnInit, AfterViewInit {
  @Input() label: string;

  @Output() searchPlaceQueryEvent = new EventEmitter<string>();

  searchPlaceQuery: string;
  isLoadingPlace: boolean;
  placeList: IPlace[];

  constructor(
    private skyscannerApi$: SkyScannerApiService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchPlace();
  }

  // Search  Place
  searchPlace() {
    const $searchPlace = document.getElementById(`place-${this.label}`);

    const searchPlace$ = fromEvent($searchPlace, 'input').pipe(
      map((event: any) => {
        this.isLoadingPlace = true;
        const query = event.target.value;
        this.searchPlaceQuery = query;
        this.searchPlaceQueryEvent.emit(this.searchPlaceQuery);
        if (!query) {
          this.clearSearchPlace();
        }
        return query;
      }),
      filter(query => query),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(query => this.skyscannerApi$.getPlaces(query))
    );

    searchPlace$.subscribe(
      (res: any) => this.onSearchPlaceSuccess(res),
      (err: any) => this.onError(err),
    );
  }

  clearSearchPlace() {
    this.placeList = [];
    this.isLoadingPlace = false;
  }

  onSearchPlaceSuccess(res: any) {
    this.isLoadingPlace = false;
    this.placeList = res.Places;
  }

  selectPlace(item: any) {
    this.searchPlaceQuery = item.PlaceId;
    this.searchPlaceQueryEvent.emit(this.searchPlaceQuery);
  }

  onError(error: any) {
    this.isLoadingPlace = false;
    throw error;
  }

}
