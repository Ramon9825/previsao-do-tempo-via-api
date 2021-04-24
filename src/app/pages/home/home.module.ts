import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../shared/components/components.module';
import { HomeEffects } from './state/home.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { HomePage } from './containers/home/home.page';
import { ReactiveFormsModule } from '@angular/forms';
import { homeReducer } from './state/home.reducer';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';

@NgModule({
  declarations: [
    HomePage,
    CurrentWeatherComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
