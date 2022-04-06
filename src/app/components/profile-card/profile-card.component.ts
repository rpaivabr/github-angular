import { Component, Input } from '@angular/core';
import { Profile, Repo } from 'src/app/app.component';

const sortTypes = ['updated_desc', 'name_asc', 'name_desc'] as const;
type SortType = typeof sortTypes[number];

type SortHandler = {
  [key: string]: (a: Repo, b: Repo) => number;
};

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent {
  @Input() profile!: Profile;

  sortRepos(event: Event, type: SortType): void {
    event.preventDefault();

    const sortHandler: SortHandler = {
      updated_desc: (a: Repo, b: Repo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      name_asc: (a: Repo, b: Repo) => a.name.localeCompare(b.name),
      name_desc: (a: Repo, b: Repo) => b.name.localeCompare(a.name),
    };

    this.profile.repos = this.profile.repos!.sort(sortHandler[type]);
  }
}
