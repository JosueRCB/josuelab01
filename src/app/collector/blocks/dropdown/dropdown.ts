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
  get required(): boolean {
    return Tripetto.assert(this.slot('option')).required || false;
  }

  get options(): {
    id: string;
    name: string;
  }[] {
    let selected = Tripetto.findFirst(this.props.options, (option: IDropdownOption) => Tripetto.castToBoolean(this.option === option.id));

    if (!selected && !this.node.placeholder) {
      selected = Tripetto.arrayItem(this.props.options, 0);
    }

    this.option = (selected && selected.id) || '';

    return this.props.options
      .filter((option: IDropdownOption) => option.name)
      .map((option: IDropdownOption) => ({
        id: option.id,
        name: option.name,
        selected: selected === option
      }));
  }

  get option(): string {
    return Tripetto.assert(this.value<string>('option')).reference;
  }

  set option(ref: string) {
    const selectedOption = Tripetto.findFirst(this.props.options, (option: IDropdownOption) => option.id === ref);

    Tripetto.assert(this.value<string>('option')).set(selectedOption && (selectedOption.value || selectedOption.name), ref);
  }

  onChange(el: HTMLSelectElement): void {
    this.option = el.value;
  }

  onFocus(el: HTMLInputElement): void {
    el.classList.remove('is-invalid');
  }

  onBlur(el: HTMLInputElement): void {
    el.classList.toggle('is-invalid', this.validation === 'fail');
  }
}
