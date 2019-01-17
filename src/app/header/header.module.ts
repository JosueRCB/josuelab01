import { HeaderComponent } from './header.component';
import { SettingsComponent } from './settings/settings.component';
import { ButtonsDocsComponent } from './buttons/docs/docs.component';
import { ButtonsControlsComponent } from './buttons/controls/controls.component';
import { CollectorModule } from '../collector/collector.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HeaderComponent, SettingsComponent, ButtonsDocsComponent, ButtonsControlsComponent],
  imports: [CommonModule, CollectorModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
