import * as Tripetto from 'tripetto-collector';
import { Component, Input } from '@angular/core';
import { IEmail } from 'tripetto-block-email';

/* tslint:disable-next-line:max-line-length */
const IS_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const SELECTOR = 'tripetto-block-email';

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
  templateUrl: './email.html',
  styleUrls: ['./email.css']
})
class EmailComponent {
  @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class EmailBlock extends Tripetto.NodeBlock<IProps, IEmail> {
  static Component = EmailComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    return {
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      slot: this.SlotAssert('email'),
      data: this.DataAssert<string>(instance, 'email')
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    const slot = this.SlotAssert('email');
    const email = this.DataAssert<string>(instance, slot);

    if (slot.Required && email.Value === '') {
      return false;
    }

    if (email.Value !== '' && !IS_EMAIL.test(email.Value)) {
      return false;
    }

    return true;
  }
}
