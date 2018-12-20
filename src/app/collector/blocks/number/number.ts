import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Number } from 'tripetto-block-number/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './number.html'
})
export class NumberBlockComponent extends BlockComponentFactory<NumberBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-number',
  ref: NumberBlockComponent
})
export class NumberBlock extends Number {
  onFocus(el: HTMLInputElement) {
    this.focus();

    // Switch to number type when focus is gained.
    el.value = this.value;
    el.type = 'number';
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement) {
    this.blur();

    // Switch to text type to allow number prefix and suffix.
    el.type = 'text';
    el.value = this.value;
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
