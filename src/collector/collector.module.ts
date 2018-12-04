import { BrowserModule } from '@angular/platform-browser';
import { CollectorComponent } from './collector.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BlockContainerComponent } from './blocks';
import { blocks } from './blocks/block';
import { MarkdownDirective } from './markdown.directive';

@NgModule({
  declarations: [CollectorComponent, BlockContainerComponent, MarkdownDirective, ...blocks],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [CollectorComponent]
})
export class CollectorModule {}
