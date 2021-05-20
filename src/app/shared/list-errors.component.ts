import { Component, Input } from '@angular/core';

import { Errors } from '../core';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    console.log('ListErrorsComponent', errorList);
    if (errorList) {
      this.formattedErrors = Object.keys(errorList || {})
        .map(key => `${key} ${errorList[key]}`);
    }
  }

  get errorList() { return this.formattedErrors; }


}
