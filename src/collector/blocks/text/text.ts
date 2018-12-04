import * as Tripetto from 'tripetto-collector';
import { Block, BlockBaseComponent } from '../block';
import { Text } from 'tripetto-block-text/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-text',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './text.html'
    })
    class TextComponent extends BlockBaseComponent {}
    return TextComponent;
  }
})
export class TextBlock extends Text {
  get required(): boolean {
    const slot = Tripetto.assert(this.slot('value'));

    return slot.required || false;
  }

  get val(): string {
    return Tripetto.assert(this.value<string>('value')).value;
  }

  set val(val: string) {
    Tripetto.assert(this.value<string>('value')).value = val;
  }

  blur() {
    const value = Tripetto.assert(this.value<string>('value'));

    this.val = value.string;
  }
}
