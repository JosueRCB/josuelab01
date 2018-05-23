import * as Tripetto from 'tripetto-collector';
import { Component, Input } from '@angular/core';
import { INumber } from 'tripetto-block-number';

const SELECTOR = 'tripetto-block-number';

interface IProps {
  name: string;
  description: string;
  explanation: string;
  placeholder: string;
  slot: Tripetto.Slot;
  data: Tripetto.Data<number>;
}

@Component({
  selector: SELECTOR,
  templateUrl: './number.html',
  styleUrls: ['./number.css']
})
class NumberComponent {
  @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class NumberBlock extends Tripetto.NodeBlock<IProps, INumber> {
  static Component = NumberComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      slot: this.SlotAssert('number'),
      data: this.DataAssert<number>(instance, 'number')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const slot = this.SlotAssert('number');
    const value = this.DataAssert<number>(instance, slot);

    return !slot.Required || value.String !== '';
  }
}
