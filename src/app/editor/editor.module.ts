import { EditorComponent } from './editor.component';
import { CollectorModule } from '../collector/collector.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, CollectorModule],
  exports: [EditorComponent]
})
export class EditorModule {}
