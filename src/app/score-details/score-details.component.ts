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

  healthGaugeColors = [
    {
      to: 25,
      color: "#FF0000",
    },
    {
      from: 25,
      to: 50,
      color: "#FFFF00",
    },
    {
      from: 50,
      to: 75,
      color: "#559900",
    },
    {
      from: 75,
      color: "#00FF00",
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public getTargetHits(hand?: string, type?: string) {
    return this.targetCounters.targetHits.filter((hit) => {
      if (hand && type) {
        return hit.hand == hand && hit.type == type;
      } else if (type) {
        return hit.type == type;
      } else if (hand) {
        return hit.hand == hand;
      }

      return true;
    }).length;
  }

  public getTargetMisses(hand?: string, type?: string) {
    return this.targetCounters.targetMisses.filter((miss) => {
      if (hand && type) {
        return miss.hand == hand && miss.type == type
      } else if (type) {
        return miss.type == type;
      } else if (hand) {
        return miss.hand == hand;
      }

      return true;
    }).length;
  }

  public getTargetTotal(hand?: string, type?: string) {
    return this.getTargetHits(hand, type) + this.getTargetMisses(hand, type);
  }
}
