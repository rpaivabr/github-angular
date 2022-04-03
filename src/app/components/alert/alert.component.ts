import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() type: string = 'info';
  @Input() show: boolean = false;

  @Output() dismiss = new EventEmitter<void>()

  close() {
    this.dismiss.emit()
  }

}
