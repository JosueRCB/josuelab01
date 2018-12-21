import { BlockComponent } from './helpers/blocks/block.component';
import { ButtonsComponent } from './helpers/buttons/buttons.component';
import { CollectorComponent } from './collector.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownDirective } from './helpers/markdown/markdown.directive';
import { NgModule } from '@angular/core';
import { PagesComponent } from './helpers/pages/pages.component';
import { ProgressbarComponent } from './helpers/progressbar/progressbar.component';

/** Import the block components. */
import { CheckboxBlockComponent } from './blocks/checkbox/checkbox';
import { CheckboxesBlockComponent } from './blocks/checkboxes/checkboxes';
import { DropdownBlockComponent } from './blocks/dropdown/dropdown';
import { EmailBlockComponent } from './blocks/email/email';
import { ExampleBlockComponent } from './blocks/example/example';
import { NumberBlockComponent } from './blocks/number/number';
import { PasswordBlockComponent } from './blocks/password/password';
import { RadiobuttonsBlockComponent } from './blocks/radiobuttons/radiobuttons';
import { TextBlockComponent } from './blocks/text/text';
import { TextareaBlockComponent } from './blocks/textarea/textarea';
import { URLBlockComponent } from './blocks/url/url';

@NgModule({
  declarations: [
    BlockComponent,
    ButtonsComponent,
    CollectorComponent,
    MarkdownDirective,
    PagesComponent,
    ProgressbarComponent,
    CheckboxBlockComponent,
    CheckboxesBlockComponent,
    DropdownBlockComponent,
    EmailBlockComponent,
    ExampleBlockComponent,
    NumberBlockComponent,
    PasswordBlockComponent,
    RadiobuttonsBlockComponent,
    TextBlockComponent,
    TextareaBlockComponent,
    URLBlockComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [CollectorComponent],

  /** Block components are dynamically loaded, so register them here. */
  entryComponents: [
    CheckboxBlockComponent,
    CheckboxesBlockComponent,
    DropdownBlockComponent,
    EmailBlockComponent,
    ExampleBlockComponent,
    NumberBlockComponent,
    PasswordBlockComponent,
    RadiobuttonsBlockComponent,
    TextBlockComponent,
    TextareaBlockComponent,
    URLBlockComponent
  ]
})
export class CollectorModule {}
