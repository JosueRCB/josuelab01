import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Checkboxes, ICheckbox } from 'tripetto-block-checkboxes/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './checkboxes.html'
})
export class CheckboxesBlockComponent extends BlockComponentFactory<CheckboxesBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-checkboxes',
  ref: CheckboxesBlockComponent
})
export class CheckboxesBlock extends Checkboxes {}
