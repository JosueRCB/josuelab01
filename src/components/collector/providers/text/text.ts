import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { IText } from 'tripetto-forms-text';
import './condition';

const SELECTOR = 'tripetto-forms-text';

interface IProps {
  name: string;
  description: string;
  explanation: string;
  placeholder: string;
  slot: Tripetto.Slot;
  data: Tripetto.Data<string>;
}

@Component({
  selector: SELECTOR,
  templateUrl: './text.html',
  styleUrls: ['./text.css']
})
class TextComponent {
  @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class TextProvider extends Tripetto.NodeProvider<IProps, IText> {
  static Component = TextComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      slot: this.SlotAssert('value'),
      data: this.DataAssert<string>(instance, 'value')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const slot = this.SlotAssert('value');
    const text = this.DataAssert<string>(instance, slot);

    return !slot.Required || text.Value !== '';
  }
}
