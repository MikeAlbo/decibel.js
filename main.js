// custom js file

/*
    1. create a new instance of decibel.
    2. create a var to store the returned audioBuffer objects
    3. call decodeAudioFiles on an array of links 
        i. ["../audioFiles/example.mp3"] return {src-1 : "../audioFiles/example.mp3" }
        ii. ["example1", "../audioFiles/example.mp3"] returs { example1 : "../audioFiles/example.mp3"}
    4. call the playback method on a file to play the file once without further processing
        
*/

"use strict";

// create a new instance of decibel
var audio = new decibel();

// var to store proccessed audio
var audioFiles;

// demo audio sources
var testSource = [                                  // **demo**
    "https://s3.amazonaws.com/decibeldemo/simonSound1.mp3",                // string
    ["src2","https://s3.amazonaws.com/decibeldemo/simonSound2.mp3"],      // array
    "https://s3.amazonaws.com/decibeldemo/simonSound3.mp3",                // string
    ["src4","https://s3.amazonaws.com/decibeldemo/simonSound4.mp3"]       // array
];

// decode audio files
audio.decodeAudioFiles(testSource).then(function(decoded){
    // success
    audioFiles = decoded;
    console.log("audioFiles loaded");
}).catch(function(err){
    // error
    console.error(err);
});


//===============================================================
// playback audio files

function playSound(button) {
    switch (button) {
        case 1 : audio.playback(audioFiles.src1); break;
        case 2 : audio.playback(audioFiles.src2); break;
        case 3 : audio.playback(audioFiles["src3"]); break;
        case 4 : audio.playback(audioFiles["src4"]); break;
        default : console.error("bad input");
    }
}

var buttonOne = document.getElementById("button1").addEventListener('click', function(){
    playSound(1);
});
var buttonTwo = document.getElementById("button2").addEventListener('click', function(){
    playSound(2);
});
var buttonThree = document.getElementById("button3").addEventListener('click', function(){
    playSound(3);
});
var buttonFour = document.getElementById("button4").addEventListener('click', function(){
    playSound(4);
});



