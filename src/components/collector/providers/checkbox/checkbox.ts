import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { ICheckbox } from 'tripetto-forms-checkbox';

const SELECTOR = 'tripetto-forms-checkbox';

interface IProps {
  name: string;
  explanation: string;
  checked: Tripetto.Data<boolean>;
}

@Component({
  selector: SELECTOR,
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css']
})
class CheckboxComponent {
  @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class CheckboxProvider extends Tripetto.NodeProvider<IProps, ICheckbox> {
  static Component = CheckboxComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.Name,
      explanation: this.Node.Props.Explanation,
      checked: this.DataAssert<boolean>(instance, 'checked')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const checkbox = this.DataAssert<boolean>(instance, 'checked');

    return !checkbox.Slot.Required || checkbox.Value;
  }
}
