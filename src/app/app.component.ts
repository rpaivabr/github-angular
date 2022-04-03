import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';

export type Profile = {
  id: number;
  login: string;
  name: string;
  followers: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  repos?: Repo[];
}

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Github Profiles';
  profiles: Profile[] = [];
  showError: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getStoredProfiles();
  }

  searchProfile(value: string): void {
    // validate if user already exists in profiles list
    const isUsenameExists = this.profiles
      .some(profile => profile.login.toLowerCase() === value.toLowerCase());
    if (isUsenameExists) return;

    this.getProfileWithRepos(value).subscribe({
      next: (profile: Profile) => {
        this.profiles.unshift(profile);
        localStorage.setItem('githubpagesdata', JSON.stringify(this.profiles));
      },
      error: (err) => {
        console.error(err);
        this.showError = true;
      }
    })
  }

  clearProfiles(): void {
    this.profiles = [];
    localStorage.removeItem('githubpagesdata')
  }

  dismissError(): void {
    this.showError = false;
  }

  private getStoredProfiles(): void {
    const storedProfiles = localStorage.getItem('githubpagesdata')
    if (storedProfiles) {
      this.profiles = JSON.parse(storedProfiles);
    }
  }

  private getProfileWithRepos(username: string): Observable<any> {
    return this.httpClient.get<Profile>(`https://api.github.com/users/${username}`).pipe(
      mergeMap(profile => this.httpClient.get<Repo[]>(profile.repos_url).pipe(
        map(repos => ({ ...profile, repos }))
      ))
    )
  }
}
