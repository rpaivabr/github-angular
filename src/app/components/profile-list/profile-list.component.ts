import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/app/app.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {

  @Input() profiles: Profile[] = [];
  @Input() showError: boolean = false;

  @Output() dismissError = new EventEmitter<boolean>();

  dismiss(): void {
    this.dismissError.emit(true);
  }

}
