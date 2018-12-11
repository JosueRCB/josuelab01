import { BlockComponent } from './helpers/blocks/block.component';
import { BlockComponentFactory } from './helpers/blocks/block.factory';
import { ButtonsComponent } from './helpers/buttons/buttons.component';
import { CollectorComponent } from './collector.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownDirective } from './helpers/markdown/markdown.directive';
import { NgModule } from '@angular/core';
import { PagesComponent } from './helpers/pages/pages.component';
import { ProgressbarComponent } from './helpers/progressbar/progressbar.component';

@NgModule({
  declarations: [
    BlockComponent,
    ButtonsComponent,
    CollectorComponent,
    MarkdownDirective,
    PagesComponent,
    ProgressbarComponent,
    ...BlockComponentFactory.declarations
  ],
  imports: [CommonModule, FormsModule],
  exports: [CollectorComponent]
})
export class CollectorModule {}
