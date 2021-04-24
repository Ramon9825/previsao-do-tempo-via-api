import { CitiesService } from './../../services/cities.service';
import { CityTypeaheadItem } from './../../models/city-typeahead-item.model';
import { Observable, Subscriber } from 'rxjs';
import { Component, OnInit, Optional, Self } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'jv-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss']
})
export class CitiesTypeaheadComponent implements OnInit, ControlValueAccessor {

  dataSoucer$: Observable<CityTypeaheadItem[]>;
  search: string;
  loading: boolean;

  disabled: boolean;
  private onChange: (value: CityTypeaheadItem) => void;
  private onTouched: () => void;


  constructor(private citiesService: CitiesService,
              @Optional() @Self() public control: NgControl) {
                control.valueAccessor = this;
               }

  ngOnInit(): void {
    this.dataSoucer$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search)
    )
      .pipe(
        switchMap((query: string) => this.citiesService.getCities(query))
      )
  }

  onSelected(match: TypeaheadMatch) {
    this.onChange(match.item);
    this.onTouched();
  }

  registerOnChange(fn: (value: CityTypeaheadItem) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue() {
  }
}
