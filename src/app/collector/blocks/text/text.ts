import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Text } from 'tripetto-block-text/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './text.html'
})
export class TextBlockComponent extends BlockComponentFactory<TextBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-text',
  ref: TextBlockComponent
})
export class TextBlock extends Text {
  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = this.textSlot.string;
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
