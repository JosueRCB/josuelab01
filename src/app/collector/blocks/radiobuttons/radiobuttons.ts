import * as Tripetto from 'tripetto-collector';
import { Block, BlockBaseComponent } from '../block';
import { Radiobuttons, IRadiobutton } from 'tripetto-block-radiobuttons/collector';
import { Component } from '@angular/core';

@Block({
  identifier: 'tripetto-block-radiobuttons',
  component: (s: string) => {
    @Component({
      selector: s,
      templateUrl: './radiobuttons.html'
    })
    class BlockComponent extends BlockBaseComponent {}
    return BlockComponent;
  }
})
export class RadiobuttonsBlock extends Radiobuttons {
  get required(): boolean {
    return Tripetto.assert(this.slot('button')).required || false;
  }

  get buttons(): {
    id: string;
    name: string;
  }[] {
    const selected =
      Tripetto.findFirst(this.props.buttons, (radiobutton: IRadiobutton) => Tripetto.castToBoolean(this.button === radiobutton.id)) ||
      (this.required && Tripetto.arrayItem(this.props.buttons, 0));

    if (selected) {
      this.button = selected.id;
    }

    return this.props.buttons
      .filter((button: IRadiobutton) => button.name)
      .map((button: IRadiobutton) => ({
        id: button.id,
        name: button.name,
        selected: selected === button,
        select: () => (this.button = button.id)
      }));
  }

  get button(): string {
    return Tripetto.assert(this.value<string>('button')).reference;
  }

  set button(ref: string) {
    const selectedButton = Tripetto.findFirst(this.props.buttons, (radiobutton: IRadiobutton) => radiobutton.id === ref);

    Tripetto.assert(this.value<string>('button')).set(selectedButton && (selectedButton.value || selectedButton.name), ref);
  }
}
