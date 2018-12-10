import { HeaderComponent } from './header.component';
import { CollectorModule } from '../collector/collector.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, CollectorModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
