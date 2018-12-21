import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Radiobuttons, IRadiobutton } from 'tripetto-block-radiobuttons/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './radiobuttons.html'
})
export class RadiobuttonsBlockComponent extends BlockComponentFactory<RadiobuttonsBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-radiobuttons',
  ref: RadiobuttonsBlockComponent
})
export class RadiobuttonsBlock extends Radiobuttons {}
