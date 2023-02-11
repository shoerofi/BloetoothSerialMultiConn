/*global cordova*/
module.exports = {

    connect: function (btName, macAddress, success, failure) {
        cordova.exec(success, failure, btName, "connect", [macAddress]);
    },

    // Android only - see http://goo.gl/1mFjZY
    connectInsecure: function (btName, macAddress, success, failure) {
        cordova.exec(success, failure, btName, "connectInsecure", [macAddress]);
    },

    disconnect: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "disconnect", []);
    },

    // list bound devices
    list: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "list", []);
    },

    isEnabled: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "isEnabled", []);
    },

    isConnected: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "isConnected", []);
    },

    // the number of bytes of data available to read is passed to the success function
    available: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "available", []);
    },

    // read all the data in the buffer
    read: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "read", []);
    },

    // reads the data in the buffer up to and including the delimiter
    readUntil: function (btName, delimiter, success, failure) {
        cordova.exec(success, failure, btName, "readUntil", [delimiter]);
    },

    // writes data to the bluetooth serial port
    // data can be an ArrayBuffer, string, integer array, or Uint8Array
    write: function (btName, data, success, failure) {

        // convert to ArrayBuffer
        if (typeof data === 'string') {
            data = stringToArrayBuffer(data);
        } else if (data instanceof Array) {
            // assuming array of interger
            data = new Uint8Array(data).buffer;
        } else if (data instanceof Uint8Array) {
            data = data.buffer;
        }

        cordova.exec(success, failure, btName, "write", [data]);
    },

    // calls the success callback when new data is available
    subscribe: function (btName, delimiter, success, failure) {
        cordova.exec(success, failure, btName, "subscribe", [delimiter]);
    },

    // removes data subscription
    unsubscribe: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "unsubscribe", []);
    },

    // calls the success callback when new data is available with an ArrayBuffer
    subscribeRawData: function (btName, success, failure) {

        successWrapper = function(data) {
            // Windows Phone flattens an array of one into a number which
            // breaks the API. Stuff it back into an ArrayBuffer.
            if (typeof data === 'number') {
                var a = new Uint8Array(1);
                a[0] = data;
                data = a.buffer;
            }
            success(data);
        };
        cordova.exec(successWrapper, failure, btName, "subscribeRaw", []);
    },

    // removes data subscription
    unsubscribeRawData: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "unsubscribeRaw", []);
    },

    // clears the data buffer
    clear: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "clear", []);
    },

    // reads the RSSI of the *connected* peripherial
    readRSSI: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "readRSSI", []);
    },

    showBluetoothSettings: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "showBluetoothSettings", []);
    },

    enable: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "enable", []);
    },

    discoverUnpaired: function (btName, success, failure) {
        cordova.exec(success, failure, btName, "discoverUnpaired", []);
    },

    setDeviceDiscoveredListener: function (btName, notify) {
        if (typeof notify != 'function')
            throw 'BluetoothSerial.setDeviceDiscoveredListener: Callback not a function';

        cordova.exec(notify, null, btName, "setDeviceDiscoveredListener", []);
    },

    clearDeviceDiscoveredListener: function (btName) {
        cordova.exec(null, null, btName, "clearDeviceDiscoveredListener", []);
    },

    setName: function (btName, newName) {
        cordova.exec(null, null, btName, "setName", [newName]);
    },

    setDiscoverable: function (btName, discoverableDuration) {
        cordova.exec(null, null, btName, "setDiscoverable", [discoverableDuration]);
    }


};

var stringToArrayBuffer = function(str) {
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
};
