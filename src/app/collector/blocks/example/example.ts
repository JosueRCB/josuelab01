import { NodeBlock, validator } from 'tripetto-collector';
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
export class CheckboxBlock extends NodeBlock {
  @validator
  validate(): boolean {
    const exampleSlot = this.slot('example-slot');

    if (exampleSlot.required) {
      const exampleValue = this.value(exampleSlot);

      return exampleValue && exampleValue.hasValue;
    }

    return true;
  }
}
