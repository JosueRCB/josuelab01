import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { IURL } from 'tripetto-forms-url';

/* tslint:disable-next-line:max-line-length */
const IS_URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const SELECTOR = 'tripetto-forms-url';

interface IProps {
    name: string;
    description: string;
    explanation: string;
    placeholder: string;
    data: Tripetto.Data<string>;
}

@Component({
    selector: SELECTOR,
    templateUrl: './url.html',
    styleUrls: ['./url.css']
})
class URLComponent {
    @Input() props: IProps;
}

@Tripetto.node(SELECTOR)
export class URLProvider extends Tripetto.NodeProvider<IProps, IURL> {
    static Component = URLComponent;

    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
        return {
            name: this.Node.Props.NameVisible && this.Node.Props.Name,
            description: this.Node.Props.Description,
            explanation: this.Node.Props.Explanation,
            placeholder: this.Node.Props.Placeholder,
            data: this.DataAssert<string>(instance, 'url')
        };
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const url = this.DataAssert<string>(instance, 'url');

        if (url.Slot.Required && url.Value === '') {
            return false;
        }

        if (url.Value !== '' && !IS_URL.test(url.Value)) {
            return false;
        }

        return true;
    }
}

