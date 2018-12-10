import * as Tripetto from 'tripetto-collector';
import { Block, BlockBaseComponent } from '../block';
import { Number } from 'tripetto-block-number/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-number',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './number.html'
    })
    class BlockComponent extends BlockBaseComponent {}
    return BlockComponent;
  }
})
export class NumberBlock extends Number {
  private focus = false;

  get required(): boolean {
    return Tripetto.assert(this.slot('number')).required || false;
  }

  get step(): string {
    const precision = Tripetto.assert(this.slot<Tripetto.Slots.Numeric>('number')).precision;

    return (precision && `0.${Tripetto.Str.fill('0', precision - 1)}1`) || '1';
  }

  get number(): string {
    const value = Tripetto.assert(this.value<number>('number'));

    return this.focus ? `${value.value}` : (value.hasValue && value.string) || '';
  }

  set number(val: string) {
    Tripetto.assert(this.value<number>('number')).pristine = val || undefined;
  }

  onFocus(el: HTMLInputElement) {
    const value = Tripetto.assert(this.value<number>('number'));

    this.focus = true;

    // Switch to number type when focus is gained.
    el.value = this.number;
    el.type = 'number';
    el.classList.remove('is-invalid');

    if (!value.hasValue) {
      value.pristine = 0;
    }
  }

  onBlur(el: HTMLInputElement) {
    const value = Tripetto.assert(this.value<number>('number'));

    this.focus = false;

    // Switch to text type to allow number prefix and suffix.
    el.type = 'text';
    el.value = value.hasValue ? value.string : '';
    el.classList.toggle('is-invalid', this.validation === 'fail');
  }
}
