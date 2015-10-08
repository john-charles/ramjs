var Promise = require('bluebird');
var RejectError = require('./RejectError');

module.exports = function (options) {
    if (!options.handler) throw new Error('handler required');

    return function () {
        var args = arguments;

        var handler = options.handler;
        var attempts = options.attempts || 5;
        var total = attempts;

        var step = options.step || function () {};
        var fallback = options.fallback || false;

        var error = { data: {} };
        error.message = options.error || 'error while retrying';


        return new Promise(function (resolve, reject) {

            function attempt() {

                if (attempts-- > 0) {
                    handler(args)
                        .then(resolve)
                        .catch(function (err) {
                            step();
                            error.data.lastError = err;
                            attempt();
                        });
                } else if (fallback) {
                    resolve(fallback);
                } else {
                    error.data.attempts = total;
                    reject(new RejectError(error.message, error.data));
                }
            }

            attempt();
        });
    };
};
