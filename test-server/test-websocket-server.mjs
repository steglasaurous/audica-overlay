import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8085 });

console.log('Started websocket server.');

wss.on('connection', function connection(ws) {
  console.log('Got a connection');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({
    "eventType": "SongSelected",
    "data": {
      "songId": "EnvelopeVIP-Continuum_a436d6bf85e13804eae44e072e87c387",
      "songName": "Envelope VIP",
      "songArtist": "TheFatRat",
      "songAuthor": "Continuum",
      "difficulty": "Expert",
      "classification": "extras",
      "songLength": "2:51",
      "ticksTotal": 130400.0
    }
  } ));

  ws.send(JSON.stringify({
    "eventType": "SongProgress",
    "data": {
      "progress": 0.0133128827,
      "timeElapsed": "0:02",
      "timeRemaining": "2:49",
      "currentTick": 1736.0
    }
  }));

  // Test target data
  // Hits
  ws.send(JSON.stringify({
    "eventType": "TargetHit",
    "data": {
      "targetIndex": 0,
      "type": "ChainStart",
      "hand": "Left",
      "score": -1.0,
      "timingScore": -1.0,
      "aimScore": 0.0,
      "tick": 6720.0,
      "targetHitPosition": "(-0.2, -0.2)"
    }
  }));
  ws.send(JSON.stringify({
    "eventType": "TargetHit",
    "data": {
      "targetIndex": 1,
      "type": "Standard",
      "hand": "Left",
      "score": -1.0,
      "timingScore": -1.0,
      "aimScore": 0.0,
      "tick": 6720.0,
      "targetHitPosition": "(-0.2, -0.2)"
    }
  }));
  ws.send(JSON.stringify({
    "eventType": "TargetHit",
    "data": {
      "targetIndex": 2,
      "type": "Standard",
      "hand": "Right",
      "score": -1.0,
      "timingScore": -1.0,
      "aimScore": 0.0,
      "tick": 6720.0,
      "targetHitPosition": "(-0.2, -0.2)"
    }
  }));

  // Misses

  ws.send(JSON.stringify({
    "eventType": "TargetMiss",
    "data": {
      "targetIndex": 17,
      "type": "Standard",
      "hand": "Left",
      "reason": "Miss"
    }
  }));

  ws.send(JSON.stringify({
    "eventType": "TargetMiss",
    "data": {
      "targetIndex": 18,
      "type": "Standard",
      "hand": "Right",
      "reason": "Miss"
    }
  }));

  ws.send(JSON.stringify({
    "eventType": "TargetMiss",
    "data": {
      "targetIndex": 19,
      "type": "ChainStart",
      "hand": "Right",
      "reason": "Miss"
    }
  }));

  ws.send(JSON.stringify({
    "eventType": "SongPlayerStatus",
    "data": {
      "health": 0.93,
      "score": 47231,
      "scoreMultiplier": 1,
      "streak": 6,
      "highScore": 3434752,
      "isFullComboSoFar": true,
      "isNoFailMode": false,
      "isPracticeMode": false,
      "songSpeed": 1.0,
      "modifiers": []
    }
  }));

});
