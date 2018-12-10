import { BlockContainerComponent } from './blocks';
import { blocks } from './blocks/block';
import { CollectorComponent } from './collector.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownDirective } from './directives/markdown.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CollectorComponent, BlockContainerComponent, MarkdownDirective, ...blocks],
  imports: [CommonModule, FormsModule],
  exports: [CollectorComponent]
})
export class CollectorModule {}
