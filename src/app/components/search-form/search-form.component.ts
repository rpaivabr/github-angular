import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchInput: string = '';

  handleSubmit(event: Event): void {
    event.preventDefault();
  }

  setSearchValue(event: Event): void {
    this.searchInput = (event.target as HTMLInputElement).value.trim();
  }

  searchProfile(): void {
    // validates if searchInput is not empty
    if (!this.searchInput) return;

    this.search.emit(this.searchInput);
  }

  clearProfiles(): void {
    this.clear.emit();
  }

}
