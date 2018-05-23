import * as Tripetto from 'tripetto-collector';
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
    return this.node.Props.Block ? this.node.Props.Block.Type : '';
  }

  get props(): {} {
    const block = this.node.Block as Tripetto.NodeBlock<{}> | undefined;

    if (!block) {
      throw new Error('The block is invalid!');
    }

    return block.OnRender(this.node.Instance, this.node.Observer);
  }
}
