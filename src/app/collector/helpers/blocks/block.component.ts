import { Component } from '@angular/core';
import { BlockComponentFactory } from './block.factory';
import '../../blocks';

@Component({
  selector: 'tripetto-block',
  template: `
    ${BlockComponentFactory.template}
    <div *ngIf="type == ''" class="static">
      <h3 *ngIf="name" markdown [content]="name" [context]="context"></h3>
      <p *ngIf="description" class="text-secondary" markdown [content]="description" [context]="context"></p>
    </div>
  `
})
export class BlockComponent extends BlockComponentFactory {}
