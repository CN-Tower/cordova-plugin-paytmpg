module.exports = {
    startOrder: function(options, successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, "PayTM", "startOrder", [JSON.stringify(options)]);
    },
    startPayment: function(options, successCallback, failureCallback) {
        cordova.exec(successCallback, failureCallback, "PayTM", "startPayment", [JSON.stringify(options)]);
    }
};