var UI = require('ui');
var ajax = require('ajax');

var baseurl = "http://172.10.1.130/cgi-bin/2.py?d=";
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
    ajax({url: url}, function(data) { console.log(data); }, function(error) { console.log(error); });                
});
menu.show();

