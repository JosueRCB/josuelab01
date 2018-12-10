import { Component } from '@angular/core';
import { template, BlockBaseComponent } from './block';
import { blocks } from './block';

/** Import blocks */
import './checkbox/checkbox';
import './checkboxes/checkboxes';
import './dropdown/dropdown';
import './email/email';
import './number/number';
import './password/password';
import './radiobuttons/radiobuttons';
import './text/text';
import './textarea/textarea';
import './url/url';

@Component({
  selector: 'tripetto-block',
  template: `
    ${template}
    <div *ngIf="type == ''">
      <h3 *ngIf="name" markdown [content]="name" [context]="context"></h3>
      <p *ngIf="description" class="text-secondary" markdown [content]="description" [context]="context"></p>
    </div>
  `
})
export class BlockContainerComponent extends BlockBaseComponent {}
