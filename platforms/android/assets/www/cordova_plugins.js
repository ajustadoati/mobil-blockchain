cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "runs": true
  },
  {
    "id": "cordova-plugin-websocket.websocket",
    "file": "plugins/cordova-plugin-websocket/www/websocket.js",
    "pluginId": "cordova-plugin-websocket",
    "clobbers": [
      "WebSocket"
    ]
  },
  {
    "id": "ionic-plugin-keyboard.keyboard",
    "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
    "pluginId": "ionic-plugin-keyboard",
    "clobbers": [
      "cordova.plugins.Keyboard"
    ],
    "runs": true
  },
  {
    "id": "onesignal-cordova-plugin.OneSignal",
    "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
    "pluginId": "onesignal-cordova-plugin",
    "clobbers": [
      "OneSignal"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-geolocation": "2.1.0",
  "cordova-plugin-websocket": "0.12.0",
  "cordova-plugin-whitelist": "1.3.2",
  "ionic-plugin-keyboard": "2.2.1",
  "onesignal-cordova-plugin": "2.2.5",
  "cordova-plugin-device": "2.0.1"
};
// BOTTOM OF METADATA
});