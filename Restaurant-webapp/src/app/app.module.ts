import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ApiModule, Configuration, ConfigurationParameters } from 'restaurant-swagger-client'
import { ReservationModule } from './reservation/reservation.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ReservationEffects } from './reservation/store/effects/reservation.effects';
import { EditService } from './services/EditService';
import { HelperService } from './services/HelperService';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.backendUrl,
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers , runtimeChecks: {
      // strictStateImmutability and strictActionImmutability are enabled by default
      strictStateSerializability: true,
      strictActionSerializability: true,
      strictActionWithinNgZone: true,
      strictActionTypeUniqueness: true,
      // if you want to change complexe objects and that we have. We need to disable these settings
      // change strictStateImmutability, strictActionImmutability
      strictStateImmutability: false, // set this to false
      strictActionImmutability: true,
  }}),
    EffectsModule.forRoot([ReservationEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReservationModule,
    ApiModule.forRoot(apiConfigFactory),
  ],
  providers: [EditService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
