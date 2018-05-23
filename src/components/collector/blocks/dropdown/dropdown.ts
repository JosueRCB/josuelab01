import * as Tripetto from 'tripetto-collector';
import { Component, Input } from '@angular/core';
import { IDropdown, IDropdownOption } from 'tripetto-block-dropdown';
import './condition';

const SELECTOR = 'tripetto-block-dropdown';

interface IProps {
  name: string;
  description: string;
  explanation: string;
  placeholder: string;
  options: IDropdownOption[];
  slot: Tripetto.Slot;
  selected: Tripetto.Data<string>;
}

@Component({
  selector: SELECTOR,
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.css']
})
class DropdownComponent {
  @Input() props: IProps;

  get option(): string {
    return this.props.selected.Reference;
  }

  set option(id: string | undefined) {
    const value = Tripetto.F.FindFirst(this.props.options, (option: IDropdownOption) => option.Id === id);

    this.props.selected.Set(value ? value.Value || value.Name : undefined, id);
  }
}

@Tripetto.node(SELECTOR)
export class DropdownBlock extends Tripetto.NodeBlock<IProps, IDropdown> {
  static Component = DropdownComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      options: this.Props.Options,
      slot: this.SlotAssert('option'),
      selected: this.DataAssert<string>(instance, 'option')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const slot = this.SlotAssert('option');
    const dropdown = this.DataAssert<string>(instance, slot);

    return !slot.Required || dropdown.Reference !== '';
  }
}
