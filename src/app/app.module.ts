import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorGotoComponent } from './mat-paginator-goto/mat-paginator-goto.component';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, MatPaginatorModule, MatSelectModule, MatToolbarModule ],
  declarations: [ AppComponent, MatPaginatorGotoComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
