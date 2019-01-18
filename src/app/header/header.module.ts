import { HeaderComponent } from './header.component';
import { SettingsComponent } from './settings/settings.component';
import { LinksComponent } from './buttons/links/links.component';
import { ControlsComponent } from './buttons/controls/controls.component';
import { CollectorModule } from '../collector/collector.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HeaderComponent, SettingsComponent, LinksComponent, ControlsComponent],
  imports: [CommonModule, CollectorModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
