import { Component } from '@angular/core';
import {tap} from "rxjs/operators";
import {webSocket} from "rxjs/webSocket";

// FIXME: Create a generic websocket server that can emit test events
//        so we can test without having to fire up the real deal.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  }

  songProgress: SongProgress = {
    currentTick: 0,
    progress: 0,
    timeElapsed: "",
    timeRemaining: ""
  }

  songInfo: SongInfo = {
    songId: "",
    songName: "",
    songArtist: "",
    songAuthor: "",
    songLength: 0,
    ticksTotal: 0,
    difficulty: "",
    classification: ""
  }

  // For target hit/miss tracking
  targetCounters: TargetCounters = {
    targetHits: [],
    targetMisses: []
  }

  title = 'audica-overlay';

  constructor() {


    const socket$ = webSocket("ws://localhost:8085/AudicaStats");

    socket$.pipe(
      tap((data: any) => {
        switch (data.eventType) {
          case 'SongProgress':
            this.processSongProgressEvent(data);
            break;
          case 'SongSelected':
            this.processSongSelected(data);
            break;
          case 'SongPlayerStatus':
            this.processSongPlayerStatus(data);
            break;
          case 'TargetHit':
            this.processTargetHit(data);
            break;
          case 'TargetMiss':
            this.processTargetMiss(data);
            break;
          case 'ReturnToSongList':
            this.resetStats();
            this.resetSong();
            break;
          case 'SongRestart':
            this.resetStats();
            break;
        }
      })
    ).subscribe();
  }

  private resetStats() {
    // FIXME: Implement
  }
  private resetSong() {
    // FIXME: Implement
  }

  processSongSelected(data: any) {
    this.songInfo.songId = data.data.songId;
    this.songInfo.songName = data.data.songName;
    this.songInfo.songArtist = data.data.songArtist;
    this.songInfo.songAuthor = data.data.songAuthor;
    this.songInfo.songLength = data.data.songLength;
    this.songInfo.difficulty = data.data.difficulty;
    this.songInfo.classification = data.data.classification;
    this.songInfo.ticksTotal = data.data.ticksTotal;
  }
  processSongProgressEvent(data: any) {
    this.songProgress.timeElapsed = data.data.timeElapsed;
    this.songProgress.timeRemaining = data.data.timeRemaining;
    this.songProgress.progress = data.data.progress;
    this.songProgress.currentTick = data.data.currentTick;
  }

  processSongPlayerStatus(data: any) {
    this.songPlayerStatus.score = data.data.score;
    this.songPlayerStatus.health = data.data.health;
    this.songPlayerStatus.scoreMultiplier = data.data.scoreMultiplier;
    this.songPlayerStatus.streak = data.data.streak;
    this.songPlayerStatus.highScore = data.data.highScore;
    this.songPlayerStatus.isFullComboSoFar = data.data.isFullComboSoFar;
    this.songPlayerStatus.isNoFailMode = data.data.isNoFailMode;
    this.songPlayerStatus.isPracticeMode = data.data.isPracticeMode;
    this.songPlayerStatus.songSpeed = data.data.songSpeed;
  }

  processTargetHit(data: any) {
    // Throw this into an observable that whatever component is reading for target hits can pick them up and process as needed.
    // FIXME: TODO
    this.targetCounters.targetHits.push({
      hand: data.data.hand,
      aimScore: data.data.aimScore,
      targetHitPosition: {
        x: data.data.targetHitPosition.x,
        y: data.data.targetHitPosition.y
      },
      targetIndex: data.data.targetIndex,
      tick: data.data.tick,
      type: data.data.type,
      score: data.data.score,
      timingScore: data.data.timingScore
    });
    // console.log(this.targetCounters.targetHits);
  }

  processTargetMiss(data: any) {
    this.targetCounters.targetMisses.push({
      hand: data.data.hand,
      targetIndex: data.data.targetIndex,
      type: data.data.type,
      reason: data.data.reason
    });
    console.log(this.targetCounters.targetMisses);
  }
}

export interface SongInfo {
  songId: string;
  songName: string;
  songArtist: string;
  songAuthor: string;
  songLength: number;
  ticksTotal: number;
  difficulty: string;
  classification: string
}

export interface SongProgress {
  timeElapsed: string;
  timeRemaining: string;
  progress: number;
  currentTick: number;
}

export interface SongPlayerStatus {
  score: number;
  health: number;
  scoreMultiplier: number;
  streak: number;
  highScore: number;
  isFullComboSoFar: boolean;
  isNoFailMode: boolean;
  isPracticeMode: boolean;
  songSpeed: number;
}

export interface TargetHitPosition {
  x: number;
  y: number;
}

export interface TargetHit {
  targetIndex: number;
  type: string;
  hand: string;
  score: number
  timingScore: number;
  aimScore: number;
  tick: number;
  targetHitPosition: TargetHitPosition;
}

export interface TargetMiss {
  targetIndex: number;
  type: string;
  hand: string;
  reason: string;
}

export interface TargetCounters {
  targetHits: TargetHit[];
  targetMisses: TargetMiss[];
}
