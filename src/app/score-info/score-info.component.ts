import {Component, Input, OnInit} from '@angular/core';
import {SongPlayerStatus} from "../app.component";

@Component({
  selector: 'app-score-info',
  templateUrl: './score-info.component.html',
  styleUrls: ['./score-info.component.scss']
})
export class ScoreInfoComponent implements OnInit {
  @Input()
  songPlayerStatus: SongPlayerStatus = {
    score: 0,
    health: 1,
    scoreMultiplier: 1,
    streak: 0,
    highScore: 0,
    isFullComboSoFar: true,
    isNoFailMode: false,
    isPracticeMode: false,
    songSpeed: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
