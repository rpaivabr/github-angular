import { Component, OnInit } from '@angular/core';

type Profile = {
  id: number;
  login: string;
  name: string;
  followers: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  repos: Repo[];
}

type Repo = {
  id: number;
  name: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

type SortHandler = {
  [key: string]: (a: Repo, b: Repo) => number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  profiles: Profile[] = [];
  showError: boolean = false;

  ngOnInit(): void {
    this.getStoredProfiles();
  }

  searchProfile(value: string): void {
    const usernames = this.profiles.map(profile => profile.login);
    const isUsernameExists = usernames.includes(value)

    if (isUsernameExists) return;

    this.getProfileWithRepos(value)
      .then(profile => {
        this.profiles.unshift(profile);
        localStorage.setItem('githubpagesdata', JSON.stringify(this.profiles));
      })
      .catch(err => {
        console.error(err);
        this.showError = true;
      })
  }

  clearProfiles(): void {
    this.profiles = [];
    localStorage.removeItem('githubpagesdata')
  }

  dismissError(): void {
    this.showError = false;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
  }

  sortRepos(event: Event, index: number, type: string): void {
    event.preventDefault();

    const sortHandler: SortHandler = {
      'name_asc': (a: Repo, b: Repo) => {
        return a.name.localeCompare(b.name);
      },
      'updated_desc': (a: Repo, b: Repo) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    }

    this.profiles[index].repos = this.profiles[index].repos
      .sort(sortHandler[type]);
  }

  private getStoredProfiles(): void {
    const storedProfiles = localStorage.getItem('githubpagesdata')
    if (storedProfiles) {
      this.profiles = JSON.parse(storedProfiles);
    }
  }

  private async getProfileWithRepos(username: string): Promise<Profile> {
    const profileResponse = await fetch(`https://api.github.com/users/${username}`)
    const profile: Profile = await profileResponse.json();

    const reposResponse = await fetch(profile.repos_url);
    const repos: Repo[] = await reposResponse.json()

    profile.repos = repos;

    return profile;
  }

}
