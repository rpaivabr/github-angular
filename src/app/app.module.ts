import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileListComponent,
    SearchFormComponent,
    ProfileCardComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
