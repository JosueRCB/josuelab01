import * as Tripetto from 'tripetto-collector';
import { Block, BlockComponentFactory } from '../../helpers/blocks/block.factory';
import { Textarea } from 'tripetto-block-textarea/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-textarea',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './textarea.html'
    })
    class BlockComponent extends BlockComponentFactory {}
    return BlockComponent;
  }
})
export class TextareaBlock extends Textarea {
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
