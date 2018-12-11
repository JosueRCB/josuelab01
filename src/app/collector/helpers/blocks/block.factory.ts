import { Input, Type } from '@angular/core';
import { Context, TNodeBlock, block, IObservableNode, NodeBlock, isString, castToBoolean, markdownifyToString } from 'tripetto-collector';
import { CollectorComponent } from '../../collector.component';

export abstract class BlockComponentFactory {
  static template = '';
  static declarations: Type<any>[] = [];

  @Input() node: IObservableNode;
  @Input() collector: CollectorComponent;

  get type(): string {
    return this.node.props.block ? this.node.props.block.type : '';
  }

  get context(): Context {
    return this.node.context;
  }

  get numerator(): string {
    return this.collector.numerators && this.node.numerator && `${this.node.numerator}. ` || '';
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
    return markdownifyToString(this.node.props.placeholder || '', this.context, '...');
  }

  get block(): NodeBlock {
    return this.node.block;
  }
}

/**
 * Registers a new block and create a component for the block.
 * @param props Specifies the props for the block.
 */
export function Block(props: { identifier: string; component: (selector: string) => Type<any> }): (pBlock: TNodeBlock) => void {
  BlockComponentFactory.declarations.push(props.component(props.identifier));
  BlockComponentFactory.template += `<${props.identifier} *ngIf="type == '${props.identifier}'" [node]="node" [collector]="collector"></${
    props.identifier
  }>`;

  return block({
    type: 'node',
    identifier: props.identifier
  });
}
