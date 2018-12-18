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
  get required(): boolean {
    return Tripetto.assert(this.slot('value')).required || false;
  }

  get text(): string {
    return Tripetto.assert(this.value<string>('value')).value;
  }

  set text(val: string) {
    Tripetto.assert(this.value<string>('value')).value = val;
  }

  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = Tripetto.assert(this.value<string>('value')).string;
    el.classList.toggle('is-invalid', this.validation === 'fail');
  }
}
