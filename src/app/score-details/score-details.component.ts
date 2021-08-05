import {Component, Input, OnInit} from '@angular/core';
import {SongPlayerStatus, SongProgress, TargetCounters} from "../app.component";

@Component({
  selector: 'app-score-details',
  templateUrl: './score-details.component.html',
  styleUrls: ['./score-details.component.scss']
})
export class ScoreDetailsComponent implements OnInit {
  @Input()
  songProgress: SongProgress = {
    currentTick: 0,
    progress: 0,
    timeElapsed: '',
    timeRemaining: ''
  }

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
    // modifiers is a list - but need to look at what this looks like in output first
  };
  @Input()
  targetCounters: TargetCounters = {
    targetHits: [],
    targetMisses: []
  };

  constructor() { }

  ngOnInit(): void {
  }

  public getTargetHits(hand?: string, type?: string) {
    return this.targetCounters.targetHits.filter((hit) => {
      if (hand && type) {
        return hit.hand == hand && hit.type == type;
      } else if (type) {
        return hit.type == type;
      }

      return hit.hand == hand;
    }).length;
  }

  public getTargetMisses(hand?: string, type?: string) {
    return this.targetCounters.targetMisses.filter((miss) => {
      if (hand && type) {
        return miss.hand == hand && miss.type == type
      } else if (type) {
        return miss.type == type;
      }

      return miss.hand == hand;
    }).length;
  }

  public getTargetTotal(hand?: string, type?: string) {
    return this.getTargetHits(hand, type) + this.getTargetMisses(hand, type);
  }
}
