import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CharactersComponent} from './characters/characters.component';
import {EpisodesComponent} from './episodes/episodes.component';
import {DepthChartComponent} from './depth-chart/depth-chart.component';
import {CharacterComponent} from './characters/character/character.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/:id/:name', component: CharacterComponent},
  {path: 'episodes', component: EpisodesComponent},
  {path: 'depth-chart', component: DepthChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
