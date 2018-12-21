import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Checkbox } from 'tripetto-block-checkbox/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './checkbox.html'
})
export class CheckboxBlockComponent extends BlockComponentFactory<CheckboxBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-checkbox',
  ref: CheckboxBlockComponent
})
export class CheckboxBlock extends Checkbox {}
