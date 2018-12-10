import * as Tripetto from 'tripetto-collector';
import { Block, BlockBaseComponent } from '../block';
import { Checkbox } from 'tripetto-block-checkbox/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-checkbox',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './checkbox.html'
    })
    class BlockComponent extends BlockBaseComponent {}
    return BlockComponent;
  }
})
export class CheckboxBlock extends Checkbox {
  get required(): boolean {
    const slot = Tripetto.assert(this.slot('checked'));

    return slot.required || false;
  }

  get checked(): boolean {
    return Tripetto.assert(this.value<boolean>('checked')).confirm().value;
  }

  set checked(checked: boolean) {
    Tripetto.assert(this.value<boolean>('checked')).value = checked;
  }
}
