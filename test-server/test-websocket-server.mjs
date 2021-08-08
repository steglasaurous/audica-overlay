import * as fs from 'fs';

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8085 });

const recordingData = fs.readFileSync('audica-websocket-test-data.txt').toString().split("\n");
if (recordingData) {
  console.log('Read ' + recordingData.length + ' recorded events from file.');
}
console.log('Started websocket server.');

let currentEventIndex;

function parseEventItem(eventItem) {
  return [
    parseInt(eventItem.substring(0,13)),
    eventItem.substring(14)
  ];
}

wss.on('connection', function connection(ws) {
  let timeoutHandler;

  function sendNextEvent(ws, eventIndex) {
    if (recordingData[eventIndex]) {
      const eventItem = parseEventItem(recordingData[eventIndex]);

      console.log(JSON.stringify(eventItem));
      ws.send(eventItem[1]);
      console.log(eventIndex);
      if (recordingData[eventIndex+1]) {
        const nextEventItem = parseEventItem(recordingData[eventIndex+1]);

        console.log('Setting next event timeout to ' + (nextEventItem[0] - eventItem[0]));
        timeoutHandler = setTimeout(sendNextEvent, nextEventItem[0] - eventItem[0], ws, eventIndex+1);
      } else {
        console.log('Event playback done.');
      }
    }
  }


  console.log('Got a connection - starting event playback');
  sendNextEvent(ws, 0);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('Closed connection, stopping event playback');
    clearTimeout(timeoutHandler);
  });
});
