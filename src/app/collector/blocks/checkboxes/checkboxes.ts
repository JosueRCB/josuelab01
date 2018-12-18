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
