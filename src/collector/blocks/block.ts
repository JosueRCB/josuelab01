import { Input, Type } from '@angular/core';
import { TNodeBlock, block, IObservableNode, NodeBlock, isString, castToBoolean, markdownifyToString } from 'tripetto-collector';

export const blocks: Type<any>[] = [];
export let template = '';

export interface IBlockComponent {
  name: string;
}

export abstract class BlockBaseComponent {
  @Input() node: IObservableNode;

  get type(): string {
    return this.node.props.block ? this.node.props.block.type : '';
  }

  get name(): string {
    return castToBoolean(this.node.props.nameVisible, true) && isString(this.node.props.name) ? this.node.props.name || '...' : '';
  }

  get description(): string {
    return this.node.props.description || '';
  }

  get explanation(): string {
    return this.node.props.explanation || '';
  }

  get placeholder(): string {
    return markdownifyToString(this.node.props.placeholder || '', this.node.context, '...');
  }

  get block(): NodeBlock {
    return this.node.block;
  }
}

/**
 * Registers a new Tripetto block and create a component for the block.
 * @param props Specifies the props for the block.
 */
export function Block(props: { identifier: string; component: (selector: string) => Type<any> }): (pBlock: TNodeBlock) => void {
  blocks.push(props.component(props.identifier));

  template += `<${props.identifier} *ngIf="type == '${props.identifier}'" [node]="node"></${props.identifier}>`;

  return block({
    type: 'node',
    identifier: props.identifier
  });
}
