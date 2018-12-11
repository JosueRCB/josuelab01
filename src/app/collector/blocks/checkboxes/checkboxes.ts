import * as Tripetto from 'tripetto-collector';
import { Block, BlockComponentFactory } from '../../helpers/blocks/block.factory';
import { Checkboxes, ICheckbox } from 'tripetto-block-checkboxes/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-checkboxes',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './checkboxes.html'
    })
    class BlockComponent extends BlockComponentFactory {}
    return BlockComponent;
  }
})
export class CheckboxesBlock extends Checkboxes {
  get checkboxes(): {
    id: string;
    name: string;
    checked: boolean;
    toggle: () => void;
  }[] {
    return this.props.checkboxes
      .filter((checkbox: ICheckbox) => checkbox.name)
      .map((checkbox: ICheckbox) => {
        const checked = Tripetto.assert(this.value<boolean>(checkbox.id)).confirm();

        return {
          id: checkbox.id,
          name: checkbox.name || '...',
          checked: checked.value,
          toggle: () => (checked.value = !checked.value)
        };
      });
  }
}
