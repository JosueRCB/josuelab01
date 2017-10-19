import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { TEMPLATE } from './template';

@Component({
    selector: 'app-collector-wrapper',
    template: `
        ${TEMPLATE}

        <div *ngIf="type == ''">
            <h3 *ngIf="name != ''">{{name}}</h3>
            <p class="text-info">{{node.Props.Description}}</p>
        </div>
    `
})
export class WrapperComponent {
    @Input() node: Tripetto.IObservableNode<{}>;

    get name(): string {
        return this.node.Props.NameVisible ? this.node.Props.Name : '';
    }

    get type(): string {
        return this.node.Props.Provider ? this.node.Props.Provider.Type : '';
    }

    get props(): {} {
        const provider = this.node.Provider as Tripetto.NodeProvider<{}> | undefined;

        if (!provider) {
            throw new Error('The provider is invalid!');
        }

        return provider.OnRender(this.node.Instance, this.node.Observer);
    }
}
