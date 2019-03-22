"use strict";
var ASQ = require("asynquence");

//import ASQ from "asq.all";
//import ASQ from "asq.all";

/*
* Generic typed function that takes in
* Request: a url to query
* Resonse: arrayItem
*
* Response1 -> shortenedURL
* Response2 ->
*
* */
function ajaxRequest(url,cb) {
    var fake_responses = {
        // after shorten() request
        // response1 yields -> shortened_url,
        "response1":
            {
                "url": "",
                "hash": "",
                "global_hash": "",
                "long_url": "",
                "new_hash": 0
            },

        //info response
        "response2":
            {
                "title": "",
                "short_url": "",
                "global_hash": "1s01hTm",
                "user_hash": "2HESacB",
            },
        //click resp
        "response3":
            {
                "user_clicks": "",
                "global_clicks": ""
            }
    }
    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log("Requesting: " + url);

    setTimeout(function(){
        cb(fake_responses[url]);
    },randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************


function getData(data) {
    //return promise to chain and listen
    return ASQ(function(done){
        setTimeout(function () {
            ajaxRequest(data,done);
        }, 1000)

    });
}

// Request all responses at once in
// // "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.
ASQ()
    .waterfall(
        function (done) {
            getData(url).pipe(done);
        }
    )
    //function call
    .seq( function (element) {
        var shortlink = element.url;
        return getData()

    })

ASQ
    .seq( getData(bitlySDK.shorten(short_url)))
    .val( output )
    .seq( getData(bitlySDK.info(short_url)) )
    .val( output )
    .seq( getData(bitlySDK.clicks(short_url)))
    .val( output )
    .val(function(){
        output("Complete!");
    });

ASQ()
    .then(function(){ setTimeout(done,100); })
    .all( // or .gate(..)
        // these 2 run "in parallel"
        function(done){ setTimeout(done,200); },
        function(done){ setTimeout(done,300); }
    )
    .then(function(){
        alert("All tasks are complete, and that took ~400ms!");
    });