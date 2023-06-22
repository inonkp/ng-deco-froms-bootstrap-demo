import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DecoFormsBootstrapModule } from 'ng-deco-forms-bootstrap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DecoFormsBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
