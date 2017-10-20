import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { INumber } from 'tripetto-forms-number';

const SELECTOR = 'tripetto-forms-number';

interface IProps {
  name: string;
  description: string;
  explanation: string;
  placeholder: string;
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
export class NumberProvider extends Tripetto.NodeProvider<IProps, INumber> {
  static Component = NumberComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      data: this.DataAssert<number>(instance, 'number')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const value = this.DataAssert<number>(instance, 'number');

    return !value.Slot.Required || value.String !== '';
  }
}
