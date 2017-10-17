import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { ICheckbox, ICheckboxes } from 'tripetto-forms-checkboxes';

const SELECTOR = 'tripetto-forms-checkboxes';

interface IProps {
    name: string;
    description: string;
    explanation: string;
    checkboxes: {
        name: string;
        checked: Tripetto.Data<boolean> | undefined;
    }[];
}

@Component({
    selector: SELECTOR,
    templateUrl: './checkboxes.html',
    styleUrls: ['./checkboxes.css']
})
class CheckboxesComponent {
    @Input() props: IProps;

    updateCheckbox(index, event) {
        const checkbox = this.props.checkboxes[index];

        if (checkbox) {
            checkbox.checked.Value = event.target.checked;
        }
    }
}

@Tripetto.node(SELECTOR)
export class CheckboxesProvider extends Tripetto.NodeProvider<IProps, ICheckboxes> {
    static Component = CheckboxesComponent;

    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
        return {
            name: this.Node.Props.NameVisible && this.Node.Props.Name,
            description: this.Node.Props.Description,
            explanation: this.Node.Props.Explanation,
            checkboxes: this.Props.Checkboxes.map((checkbox: ICheckbox) => ({
                name: checkbox.Name,
                checked: this.Data<boolean>(instance, checkbox.Id)
            }))
        };
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        return true;
    }
}

