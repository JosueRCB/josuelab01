import { BrowserModule } from '@angular/platform-browser';
import { CollectorComponent } from './collector.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BlockComponent } from './blocks/block.component';
import { blocks } from './blocks/block';

@NgModule({
  declarations: [CollectorComponent, BlockComponent, ...blocks],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [CollectorComponent]
})
export class CollectorModule {}
