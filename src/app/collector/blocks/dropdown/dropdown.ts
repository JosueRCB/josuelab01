import * as Tripetto from 'tripetto-collector';
import { BlockComponentFactory } from '../../helpers/blocks/factory';
import { Dropdown, IDropdownOption } from 'tripetto-block-dropdown/collector';
import { Component } from '@angular/core';

@Component({
  templateUrl: './dropdown.html'
})
export class DropdownBlockComponent extends BlockComponentFactory<DropdownBlock> {}

@Tripetto.block({
  type: 'node',
  identifier: 'tripetto-block-dropdown',
  ref: DropdownBlockComponent
})
export class DropdownBlock extends Dropdown {
  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.classList.toggle('is-invalid', this.isFailed);
  }
}
