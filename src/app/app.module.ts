import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ 
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],

  providers: [],


})
export class AppModule { }
