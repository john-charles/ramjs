# RamJS

Retries any function which returns a promise for a given number of attempts and then either rejects or resolves with a given fallback.

## Usage

More detailed documentation coming soon... in the meantime, here's an example:

    var ram = require('ramjs');
    var fallbackData = require('./fallback.json');

    var ramRequest = ram({
        handler: function (requestOptions) {
            return new Promise(function (resolve, reject) {
                request(requestOptions, function (err, res, body) {
                    if (err || res.statusCode >= 400) {
                        reject(err || res);
                    } else {
                        resolve(body);
                    }
                });
            });
        },
        attempts: 3,
        fallback: fallbackData
    });

    ramRequest({ method: 'GET', url: 'https://api.twitter.com/1.1/search/tweets.json' });


## Install

    npm install

<br>

## Lint

    gulp lint

<br>

## Test

    gulp test

<br>

## Generate Coverage Report

    gulp coverage

<br>

## Run Default Tasks (Lint and Test)

    gulp

<br>

