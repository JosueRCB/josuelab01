import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { URL } from 'tripetto-block-url/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './url.html'
})
export class URLBlockComponent extends BlockComponentFactory<URLBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-url',
  ref: URLBlockComponent
})
export class URLBlock extends URL {
  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = this.urlSlot.string;
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
