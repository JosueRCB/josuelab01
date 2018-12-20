import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Type, NgZone } from '@angular/core';
import { BlockComponentFactory } from './factory';

@Component({
  selector: 'tripetto-block',
  templateUrl: './block.component.html'
})
export class BlockComponent extends BlockComponentFactory implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit() {
    if (this.node.block) {
      this.zone.run(() => {
        const component = this.componentFactoryResolver.resolveComponentFactory<BlockComponentFactory>(this.node.block.type.ref as Type<
          any
        >);
        const instance = this.viewContainerRef.createComponent<BlockComponentFactory>(component).instance;

        instance.node = this.node;
        instance.collector = this.collector;
      });
    }
  }
}
