import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CharactersComponent} from './characters/characters.component';
import {EpisodesComponent} from './episodes/episodes.component';
import {DepthChartComponent} from './depth-chart/depth-chart.component';
import {CharacterComponent} from './characters/character/character.component';
import {AuthComponent} from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewEpisodeComponent} from './new-episode/new-episode.component';
import {LoadingSpinnerComponent} from './new-episode/loading-spinner/loading-spinner.component';
import {CharacterEditComponent} from './characters/character-edit/character-edit.component';
import { MiscComponent } from './misc/misc.component';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    CharactersComponent,
    EpisodesComponent,
    DepthChartComponent,
    CharacterComponent,
    AuthComponent,
    NewEpisodeComponent,
    LoadingSpinnerComponent,
    CharacterEditComponent,
    MiscComponent,
    PhotosComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
