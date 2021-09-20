# Audica Overlay

Displays an overlay showing current score, song info and optionally detailed stats on target hits and misses.

## Requirements

* Requires the [Audica Websocket Server](https://github.com/steglasaurous/audica-websocket-server) mod to be installed in Audica.

## Usage

* In OBS, add a new browser source to your scene.  Use this URL for the source: 

  ```
  https://steglasaurous.github.io/audica-overlay
  ```

### Optional Parameters

* To show detailed stats on score, add the query string parameter `show-stats=1` to the URL, like so:
  ```
  https://steglasaurous.github.io/audica-overlay?show-stats=1
  ```

## Bugs and feature suggestions

Please add any bugs or feature suggestions to the issues tab for this repository. 

