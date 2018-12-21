import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Textarea } from 'tripetto-block-textarea/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './textarea.html'
})
export class TextareaBlockComponent extends BlockComponentFactory<TextareaBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-textarea',
  ref: TextareaBlockComponent
})
export class TextareaBlock extends Textarea {
  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = this.textareaSlot.string;
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
