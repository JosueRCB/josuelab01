import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Component } from '@angular/core';

@Component({
  templateUrl: './example.html'
})
export class ExampleBlockComponent extends BlockComponentFactory<ExampleBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'example',
  ref: ExampleBlockComponent
})
export class ExampleBlock extends Tripetto.NodeBlock {
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
