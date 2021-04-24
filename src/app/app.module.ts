import { reducers } from './shared/state/app.reducer';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { BookmarksModule } from './pages/bookmarks/bookmarks.module';
import { HomeModule } from './pages/home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterSerializer } from './shared/state/router/router.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitSelectorComponent } from './pages/home/containers/unit-selector/unit-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitSelectorComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    BookmarksModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomRouterSerializer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
