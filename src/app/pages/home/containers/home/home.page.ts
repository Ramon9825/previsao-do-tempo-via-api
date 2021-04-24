import { Observable, Subject } from 'rxjs';
import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { PortalOutlet, DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelector from '../../state/home.selectors'
import { CityWeather } from 'src/app/shared/models/weather.model';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { takeUntil } from 'rxjs/operators';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';
import { UnitSelectorComponent } from '../unit-selector/unit-selector.component';

@Component({
  selector: 'jv-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather: CityWeather;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  searchControl: FormControl;
  searchControlWithAutocomplete: FormControl;

  text: string;

  private componentDestroyed$ = new Subject();
  private portalOutlet: PortalOutlet;

  constructor(private store: Store,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

  ngOnInit(): void {
    this.store.pipe(
                  select(fromHomeSelector.selectCurrentWeather),
                  takeUntil(this.componentDestroyed$),
                  )
              .subscribe(value => this.cityWeather = value);
    this.searchControl = new FormControl('', Validators.required);
    this.loading$ = this.store.pipe(select(fromHomeSelector.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelector.selectCurrentWeatherError));
    this.searchControlWithAutocomplete = new FormControl(undefined);
    this.searchControlWithAutocomplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherById({id: value.geonameid.toString()}));
        }
      });

      this.setPortal();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.portalOutlet.detach();
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }))
  }

  onToggleBookmark() {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }

  private setPortal() {
    const el = document.querySelector('#navbar-portal-outlet');
    this.portalOutlet = new DomPortalOutlet(
      el,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
  }

}
