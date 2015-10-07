var Promise = require('bluebird');

module.exports = function (options) {
    if (!options.handler) throw new Error('handler required');

    return function () {
        var args = arguments;

        var handler = options.handler;
        var attempts = options.attempts || 5;
        var reset = options.reset || function () {};
        var error = options.error || { message: 'error while retrying' };
        var fallback = options.fallback || false;

        var total = attempts;

        return new Promise(function (resolve, reject) {

            function attempt() {

                if (attempts-- > 0) {
                    handler(args)
                        .then(function (data) {
                            resolve(data);
                        })
                        .catch(function (err) {
                            reset();
                            error.lastError = err;
                            attempt();
                        });
                } else if (fallback) {
                    resolve(fallback);
                } else {
                    error.attempts = total;
                    reject(error);
                }
            }

            attempt();
        });
    };
};
