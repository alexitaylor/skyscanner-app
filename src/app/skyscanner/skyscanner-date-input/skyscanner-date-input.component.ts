import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-skyscanner-date-input',
  templateUrl: './skyscanner-date-input.component.html',
  styleUrls: ['./skyscanner-date-input.component.scss']
})
export class SkyscannerDateInputComponent implements OnInit {
  @Input() label: string;

  @Input() date: string;
  @Output() dateEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleDate() {
    this.dateEvent.emit(this.date);
  }

}
