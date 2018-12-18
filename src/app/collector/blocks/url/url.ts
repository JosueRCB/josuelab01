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
  get required(): boolean {
    return Tripetto.assert(this.slot('url')).required || false;
  }

  get url(): string {
    return Tripetto.assert(this.value<string>('url')).value;
  }

  set url(val: string) {
    Tripetto.assert(this.value<string>('url')).value = val;
  }

  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.value = Tripetto.assert(this.value<string>('url')).string;
    el.classList.toggle('is-invalid', this.validation === 'fail');
  }
}
