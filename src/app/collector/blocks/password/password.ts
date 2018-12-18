import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Password } from 'tripetto-block-password/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './password.html'
})
export class PasswordBlockComponent extends BlockComponentFactory<PasswordBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-password',
  ref: PasswordBlockComponent
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
