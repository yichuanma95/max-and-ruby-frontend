import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CharactersComponent} from './characters/characters.component';
import {EpisodesComponent} from './episodes/episodes.component';
import {DepthChartComponent} from './depth-chart/depth-chart.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'episodes', component: EpisodesComponent},
  {path: 'depth-chart', component: DepthChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
