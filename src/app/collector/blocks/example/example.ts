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
  readonly exampleSlot = Tripetto.assert(this.valueOf('example-slot'));
  readonly required = this.exampleSlot.slot.required || false;
}
