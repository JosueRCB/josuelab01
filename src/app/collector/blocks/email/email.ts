import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Email } from 'tripetto-block-email/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './email.html'
})
export class EmailBlockComponent extends BlockComponentFactory<EmailBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-email',
  ref: EmailBlockComponent
})
export class EmailBlock extends Email {
  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = this.emailSlot.string;
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
