import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { IPassword } from 'tripetto-forms-password';

const SELECTOR = 'tripetto-forms-password';

interface IProps {
  name: string;
  description: string;
  explanation: string;
  placeholder: string;
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
export class PasswordProvider extends Tripetto.NodeProvider<IProps, IPassword> {
  static Component = PasswordComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      data: this.DataAssert<string>(instance, 'password')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const password = this.DataAssert<string>(instance, 'password');

    return !password.Slot.Required || password.Value !== '';
  }
}
