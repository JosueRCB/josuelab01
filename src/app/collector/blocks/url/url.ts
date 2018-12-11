import * as Tripetto from 'tripetto-collector';
import { Block, BlockComponentFactory } from '../../helpers/blocks/block.factory';
import { URL } from 'tripetto-block-url/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-url',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './url.html'
    })
    class BlockComponent extends BlockComponentFactory {}
    return BlockComponent;
  }
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
