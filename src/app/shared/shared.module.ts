import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent, NgbModule]
})
export class SharedModule {}
