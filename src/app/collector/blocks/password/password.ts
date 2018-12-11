import * as Tripetto from 'tripetto-collector';
import { Block, BlockComponentFactory } from '../../helpers/blocks/block.factory';
import { Password } from 'tripetto-block-password/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-password',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './password.html'
    })
    class BlockComponent extends BlockComponentFactory {}
    return BlockComponent;
  }
})
export class PasswordBlock extends Password {
  get required(): boolean {
    return Tripetto.assert(this.slot('password')).required || false;
  }

  get password(): string {
    return Tripetto.assert(this.value<string>('password')).value;
  }

  set password(val: string) {
    Tripetto.assert(this.value<string>('password')).value = val;
  }

  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = Tripetto.assert(this.value<string>('password')).string;
    el.classList.toggle('is-invalid', this.validation === 'fail');
  }
}
