import { Component } from '@angular/core';
import { template, BlockBaseComponent } from './block';
import { blocks } from './block';

/** Import blocks */
import './checkbox/checkbox';
import './text/text';
/*
import './checkboxes/checkboxes';
import './dropdown/dropdown';
import './email/email';
import './number/number';
import './password/password';
import './radiobuttons/radiobuttons';
import './textarea/textarea';
import './url/url';
*/

@Component({
  selector: 'tripetto-block',
  template: `
    ${template}
    <div *ngIf="type == ''">
      <h3 *ngIf="name">{{ name }}</h3>
      <p class="text-secondary" *ngIf="description">{{ description }}</p>
    </div>
  `
})
export class BlockContainerComponent extends BlockBaseComponent {}
