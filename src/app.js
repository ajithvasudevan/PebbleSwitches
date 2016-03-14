var UI = require('ui');
var ajax = require('ajax');
var vibe = require('ui/vibe');
var Settings = require('settings');

var baseurl = Settings.option('baseurl');
console.log('baseurl in Settings: ' + baseurl);
if(!baseurl) baseurl = "http://172.10.1.130/cgi-bin/2.py?d=";

Settings.config(
  { url: 'http://172.10.1.130/config.html' },
  function(e) {
    console.log('opening configurable');
    console.log(JSON.stringify(e));
    console.log('baseurl set in options: ' + baseurl);
    Settings.option('baseurl', baseurl);  
  },
  function(e) {
    console.log('closed configurable');
    console.log(JSON.stringify(e.options)); 
    if (e.failed) {
      console.log(e.response);
    }  
    console.log("baseurl = " + e.options.baseurl);
    baseurl = e.options.baseurl;
    Settings.option('baseurl', baseurl);  
    console.log('baseurl (closed) = ' + baseurl);  
  }
);


baseurl = "http://172.10.1.130/cgi-bin/2.py?d=";
var menu = new UI.Menu({
    sections: [{
        items: [{
            title: 'Light On',
            device:'HALL_LAMP',
            state: 'ON'
        }, {
            title: 'Light Off',
            device:'HALL_LAMP',
            state: 'OFF'
        }, {
            title: 'Fan On',
            device:'HALL_LEFT_FAN',
            state: 'ON'
        }, {
            title: 'Fan Off',
            device:'HALL_LEFT_FAN',
            state: 'OFF'
        }, {
            title: 'Tube On',
            device:'HALL_TUBE',
            state: 'ON'
        }, {
            title: 'Tube Off',
            device:'HALL_TUBE',
            state: 'OFF'
        }]
    }]
});
menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"'); 
    var url = baseurl + e.item.device + "&s=" + e.item.state;
    console.log("url = " + url);
    ajax({url: url}, function(data) { console.log(data); vibe.vibrate('short'); }, function(error) { console.log(error); });                
});
menu.show();

