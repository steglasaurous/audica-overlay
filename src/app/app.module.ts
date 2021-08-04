import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreInfoComponent } from './score-info/score-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { SongDetailsComponent } from './song-details/song-details.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ScoreDetailsComponent } from './score-details/score-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreInfoComponent,
    SongDetailsComponent,
    ScoreDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
