# Decibel.js
readme

## Demo
[Demo Page]( https://mikealbo.github.io/decibel.js/)

## Important Note
The web audio api used by decibal.js does not currently work with IE and older releases of Firefox, Chrome, Safari, or Opera.

## About
Decibal.js streamlines the importing, decoding, and playback of audio files using the Web Audio Api. 

## Instructions

### Create an array of audio files

you can create an array of links, or a 2d array of file names and links

an array containing only links
``` javascript
var source = ['../audioFiles/example.mp3']; //returns {src1 : AudioBuffer }
```

an 2d array of source names and links
``` javascript
var source = [['exAudio1', '../audioFiles/example.mp3']]; // returns {exAudio1 : AudioBuffer}
```

### new Decibel
create a new instance of decibel

``` javascript
var auido = new Decibel();
```

### Store Decoded Files
create a var to hold the decoded files
``` javascript
var audioFiles;
```

### Call the decodeAudioFiles method
the decodeAudioFiles method takes in an array and returns an object using a promise structure

``` javascript
audio.decodeAudioFiles(source).then(function(decoded){
    // success
    audioFiles = decoded;
    console.log("audioFiles loaded");
}).catch(function(err){
    // error
    console.error(err);
});
```
upon success the audioFiles var will look like: 
``` javascript
{
src1 : AudioBuffer,
src2 : AudioBuffer,
src3 : AudioBuffer,
src4 : AudioBuffer // ... and so on
}
```


### playback files

once the audio files have been loaded, you can use the playback method to play the individual files

``` javascript
audio.playback(audioFiles.src1);
```

## Feature Request
If there's an issue or a feature you'd like to see added, please create an issue or fork the repo

## License 
to be added

