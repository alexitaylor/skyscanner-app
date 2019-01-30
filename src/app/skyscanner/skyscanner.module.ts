import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SkyscannerSearchPlaceComponent } from './skyscanner-search-place/skyscanner-search-place.component';
import { SkyscannerDateInputComponent } from './skyscanner-date-input/skyscanner-date-input.component';
import { SkyscannerFlightsListComponent } from './skyscanner-flights-list/skyscanner-flights-list.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })],
  declarations: [SkyscannerSearchPlaceComponent, SkyscannerDateInputComponent, SkyscannerFlightsListComponent],
  providers: [],
  exports: [SkyscannerSearchPlaceComponent, SkyscannerDateInputComponent, SkyscannerFlightsListComponent]
})
export class SkyscannerModule {}
