import { Component, Input } from '@angular/core';
import { Profile, Repo } from 'src/app/app.component';

type SortHandler = {
  [key: string]: (a: Repo, b: Repo) => number;
}

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

  @Input() profile!: Profile;

  sortRepos(event: Event, type: string): void {
    event.preventDefault();

    const sortHandler: SortHandler = {
      'name_asc': (a: Repo, b: Repo) => {
        return a.name.localeCompare(b.name);
      },
      'updated_desc': (a: Repo, b: Repo) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    }

    this.profile.repos = this.profile.repos!
      .sort(sortHandler[type]);
  }

}
