import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material-module';
import { CarouselComponent } from './carousel/carousel.component';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { MostLikedComponent } from './most-liked/most-liked.component';

@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    CarouselComponent
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    BeerListComponent,
    MostLikedComponent,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
