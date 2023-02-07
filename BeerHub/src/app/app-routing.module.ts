import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerHistoryComponent } from './beer-history/beer-history.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerTypesComponent } from './beer-types/beer-types.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'beer-list', component: BeerListComponent, pathMatch: 'full' },
  { path: 'beer-history', component: BeerHistoryComponent, pathMatch: 'full'},
  { path: 'beer-types', component: BeerTypesComponent, pathMatch: 'full'}
];
//{ path: 'beer/:beerId', component: BeerComponent, pathMatch: 'full' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
