import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdsenseModule } from 'ng2-adsense';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material-module';
import { CarouselComponent } from './carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { MostLikedComponent } from './most-liked/most-liked.component';
import { PunkAPIService } from './shared/services/PunkAPI.service';
import { HttpClientModule } from '@angular/common/http';
import { BeerHistoryComponent } from './beer-history/beer-history.component';
import { BeerTypesComponent } from './beer-types/beer-types.component';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { BeerSingleComponent } from './beer-single/beer-single.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    AdsenseModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    CarouselComponent,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    BeerListComponent,
    MostLikedComponent,
    BeerHistoryComponent,
    BeerTypesComponent,
    BeerSingleComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '208567128833-81qak2n21290s6ie0gtkrlrbl6i5jvma.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    PunkAPIService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
