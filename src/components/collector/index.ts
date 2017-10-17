import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CollectorComponent } from './collector';
import { DECLARATIONS } from './declarations';

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    CollectorComponent
  ]
})
export class CollectorModule { }
