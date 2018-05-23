import * as Tripetto from 'tripetto-collector';
import { Component, Input } from '@angular/core';
import { IPassword } from 'tripetto-block-password';

const SELECTOR = 'tripetto-block-password';

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
  templateUrl: './password.html',
  styleUrls: ['./password.css']
})
class PasswordComponent {
  @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class PasswordBlock extends Tripetto.NodeBlock<IProps, IPassword> {
  static Component = PasswordComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      slot: this.SlotAssert('password'),
      data: this.DataAssert<string>(instance, 'password')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const slot = this.SlotAssert('password');
    const password = this.DataAssert<string>(instance, slot);

    return !slot.Required || password.Value !== '';
  }
}
