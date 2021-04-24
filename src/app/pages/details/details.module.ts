import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';
import { ComponentsModule } from './../../shared/components/components.module';
import { DetailsGuard } from './services/details.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from './containers/details/details.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { detailsReducer } from './state/details.reducer';
import { DetailsEffects } from './state/details.effects';



@NgModule({
  declarations: [
    DetailsPage,
    DailyWeatherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DetailsPage, canActivate: [DetailsGuard] }]),
    ComponentsModule,
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
  ],
  providers: [
    DetailsGuard
  ]
})
export class DetailsModule { }
