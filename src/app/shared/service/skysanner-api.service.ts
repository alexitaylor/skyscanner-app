import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

export interface IBrowseQuotesPayload {
  country: string;
  currency: string;
  locale: string;
  originplace: string;
  destinationplace: string;
  outboundpartialdate: string;
  inboundpartialdate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkyScannerApiService {
  private skySannerUrl = environment.SKYSANNER_API_URL;
  private mashApeKey = environment.MASHAPE_KEY;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.headers = new HttpHeaders({
      'X-Mashape-Key': this.mashApeKey,
      'Accept': 'application/json',
    });
  }

  getPlaces(query: string): Observable<any> {
    return this.http.get(`${this.skySannerUrl}/autosuggest/v1.0/US/USD/en-US/?query=${query}`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(err => {
        this.toastr.error('Error', err.message);
        throw err;
      })
    );
  }

  getBrowseQuotes(payload: IBrowseQuotesPayload): Observable<any> {
    const query = `${payload.country}/${payload.currency}/${payload.locale}/${payload.originplace}/${payload.destinationplace}/${payload.outboundpartialdate}?inboundpartialdate=${payload.inboundpartialdate}`;
    return this.http.get(`${this.skySannerUrl}/browsequotes/v1.0/${query}`, { headers: this.headers }).pipe(
      map(res => res),
      catchError(err => {
        this.toastr.error('Error', err.message);
        throw err;
      })
    );
  }
}

