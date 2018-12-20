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
  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = this.passwordSlot.string;
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
