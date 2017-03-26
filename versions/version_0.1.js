"use strict";
var ctx; // global webAudio api var

window.addEventListener("load", init, false);

// init the audio context
function init() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioContext();
        console.log("AudioContext created!");
    }
    catch (e) {
        alert("Web Audio not supported in your browser, please try a newer release of Safari, Chrome, or Firefox");
    }
}

// decibel constructor
function decibel() {

    // decode audio files
    this.decodeAudioFiles = function (audioSources) {
        return new Promise(function (resolve, reject) {

            // store pending promises
            var reqPromises = [];

            // preprocess the current file
            function prepFile(file, source) {
                if (typeof file === "string") return ["src" + (source.indexOf(file) + 1), file];
                else if (typeof file[0] === "string") return [file[0], file[1]];
                else throw new Error(file + ", at index: " + source.indexOf(file) + " is not of correct type");
            } // prep

            // httpReq
            function httpReq(file, source) {
                return new Promise(function (resolve, reject) {
                    var preppedFile = prepFile(file, source);
                    if (preppedFile) {
                        var req = new XMLHttpRequest();
                        req.open('GET', preppedFile[1], true);
                        req.responseType = 'arraybuffer';
                        req.onload = function () {
                            if (req.readyState === 4) {
                                if (req.status === 200) {
                                    ctx.decodeAudioData(req.response, function (buffer) {
                                        resolve([preppedFile[0], buffer]);
                                    }, function (err) {
                                        throw new Error("failed to decode: " + preppedFile);
                                    });
                                }
                            } else {
                                throw new Error(req.statusText);
                            }
                        }; // onload

                        req.onerror = function (e) {
                            throw new Error(req.statusText);
                        };

                        req.send();

                    } else {
                        throw new Error("error prepping file: " + file);
                    }
                }); // promise
            } // http req

            // add httpReq promisses to reqPromises
            audioSources.forEach(function (source) {
                reqPromises.push(httpReq(source, audioSources));
            });

            // check that all httpReq promises have been completed, post process
            return Promise.all(reqPromises).then(function (dataArrays) {
                var dataObject = {};
                dataArrays.forEach(function (e) {
                    dataObject[e[0]] = e[1];
                });
                resolve(dataObject);
            }).catch(function (err) {
                reject(err);
            });

        }); // decode promise
    }; // decode audio sources


    // playback method
    this.playback = function (buffer) {
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
    }; // playback

} //decibel