import * as Tripetto from 'tripetto-collector';
import { Block, BlockBaseComponent } from '../block';
import { Checkboxes, ICheckbox } from 'tripetto-block-checkboxes/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-checkboxes',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './checkboxes.html'
    })
    class CheckboxesComponent extends BlockBaseComponent {}
    return CheckboxesComponent;
  }
})

export class CheckboxesBlock extends Checkboxes {
  get checkboxes(): {
    name: string;
    checked: Tripetto.Value<boolean>;
  }[] {
    return this.props.checkboxes.map((checkbox: ICheckbox) => {
      const checked = Tripetto.assert(this.value<boolean>(checkbox.id));

      checked.confirm();

      if (checkbox.name) {
        return {
          name: checkbox.name,
          checked: checked
        };
      }

      return undefined;
    });
  }
}
