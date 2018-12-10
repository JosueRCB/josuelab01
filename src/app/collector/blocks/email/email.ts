import * as Tripetto from 'tripetto-collector';
import { Block, BlockBaseComponent } from '../block';
import { Email } from 'tripetto-block-email/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-email',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './email.html'
    })
    class BlockComponent extends BlockBaseComponent {}
    return BlockComponent;
  }
})
export class EmailBlock extends Email {
  get required(): boolean {
    return Tripetto.assert(this.slot('email')).required || false;
  }

  get emailAddress(): string {
    return Tripetto.assert(this.value<string>('email')).value;
  }

  set emailAddress(val: string) {
    Tripetto.assert(this.value<string>('email')).value = val;
  }

  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = Tripetto.assert(this.value<string>('email')).string;
    el.classList.toggle('is-invalid', this.validation === 'fail');
  }
}
