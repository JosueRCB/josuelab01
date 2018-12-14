import * as Tripetto from 'tripetto-collector';
import { Block, BlockComponentFactory } from '../../helpers/blocks/block.factory';
import { Component } from '@angular/core';

@Block({
  identifier: 'example',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './example.html'
    })
    class BlockComponent extends BlockComponentFactory {}
    return BlockComponent;
  }
})
export class CheckboxBlock extends Tripetto.NodeBlock {
  get exampleValue(): Tripetto.Value<string> {
    return Tripetto.assert(this.value('example-slot'));
  }

  @Tripetto.validator
  validate(): boolean {
    const exampleSlot = this.slot('example-slot');

    if (!exampleSlot) {
      return false;
    }

    if (exampleSlot.required) {
      const exampleValue = this.value(exampleSlot);

      return (exampleValue && exampleValue.hasValue) || false;
    }

    return true;
  }
}
