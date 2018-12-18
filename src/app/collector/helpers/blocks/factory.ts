import { Input } from '@angular/core';
import { Context, IObservableNode, NodeBlock, isString, castToBoolean, markdownifyToString } from 'tripetto-collector';
import { CollectorComponent } from '../../collector.component';

export abstract class BlockComponentFactory<T extends NodeBlock = NodeBlock> {
  @Input() node: IObservableNode<T>;
  @Input() collector: CollectorComponent;

  get block(): T | undefined {
    return this.node.block;
  }

  get context(): Context {
    return this.node.context;
  }

  get enumerator(): string {
    return (this.collector.enumerators && this.node.enumerator && `${this.node.enumerator}. `) || '';
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
}
