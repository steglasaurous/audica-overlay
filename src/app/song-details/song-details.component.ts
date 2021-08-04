import {Component, Input, OnInit} from '@angular/core';
import {SongInfo} from "../app.component";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {
  @Input()
  songInfo: SongInfo = {
    songId: "",
    songName: "",
    songArtist: "",
    songAuthor: "",
    songLength: 0,
    ticksTotal: 0,
    difficulty: "",
    classification: ""
  };

  constructor() {

  }

  ngOnInit(): void {
  }

}
