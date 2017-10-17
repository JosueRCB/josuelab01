import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { IEmail } from 'tripetto-forms-email';

/* tslint:disable-next-line:max-line-length */
const IS_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const SELECTOR = 'tripetto-forms-email';

interface IProps {
    name: string;
    description: string;
    explanation: string;
    placeholder: string;
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
export class EmailProvider extends Tripetto.NodeProvider<IProps, IEmail> {
    static Component = EmailComponent;

    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
        return {
            name: this.Node.Props.NameVisible && this.Node.Props.Name,
            description: this.Node.Props.Description,
            explanation: this.Node.Props.Explanation,
            placeholder: this.Node.Props.Placeholder,
            data: this.DataAssert<string>(instance, 'email')
        };
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const email = this.DataAssert<string>(instance, 'email');

        if (email.Slot.Required && email.Value === '') {
            return false;
        }

        if (email.Value !== '' && !IS_EMAIL.test(email.Value)) {
            return false;
        }

        return true;
    }
}

