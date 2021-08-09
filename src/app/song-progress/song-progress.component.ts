import {Component, Input, OnInit} from '@angular/core';
import {SongProgress} from "../app.component";

@Component({
  selector: 'app-song-progress',
  templateUrl: './song-progress.component.html',
  styleUrls: ['./song-progress.component.scss']
})
export class SongProgressComponent implements OnInit {
  @Input()
  songProgress: SongProgress = {
    currentTick: 0,
    progress: 0,
    timeElapsed: '',
    timeRemaining: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
