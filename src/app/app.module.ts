import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CollectorModule } from './collector/collector.module';
import { EditorModule } from './editor/editor.module';
import { HeaderModule } from './header/header.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, EditorModule, HeaderModule, CollectorModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
