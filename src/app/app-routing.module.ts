import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CharactersComponent} from './characters/characters.component';
import {EpisodesComponent} from './episodes/episodes.component';
import {DepthChartComponent} from './depth-chart/depth-chart.component';
import {CharacterComponent} from './characters/character/character.component';
import {AuthComponent} from './auth/auth.component';
import {NewEpisodeComponent} from './new-episode/new-episode.component';
import {CharacterEditComponent} from './characters/character-edit/character-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/:name', component: CharacterComponent},
  {path: 'characters/:name/edit', component: CharacterEditComponent},
  {path: 'episodes', component: EpisodesComponent},
  {path: 'depth-chart', component: DepthChartComponent},
  {path: 'login', component: AuthComponent},
  {path: 'new-episode', component: NewEpisodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
