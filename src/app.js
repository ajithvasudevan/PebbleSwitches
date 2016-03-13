var UI = require('ui');
var ajax = require('ajax');

var url = "";
var menu = new UI.Menu({
    sections: [{
        items: [{
            title: 'Light On'
        }, {
            title: 'Light Off'
        }, {
            title: 'Fan On'
        }, {
            title: 'Fan Off'
        }, {
            title: 'Tube On'
        }, {
            title: 'Tube Off'
        }]
    }]
});
menu.on('select', function(e) {
    //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    var item = e.item.title; 
    console.log('The item is titled "' + item + '"'); 
    if(item.trim() === 'Fan On') {url = 'http://172.10.1.130/cgi-bin/2.py?d=HALL_LEFT_FAN&s=ON'; }
    else if(item.trim() === 'Fan Off') {url = 'http://172.10.1.130/cgi-bin/2.py?d=HALL_LEFT_FAN&s=OFF'; }
    else if(item.trim() === 'Light On') {url = 'http://172.10.1.130/cgi-bin/2.py?d=HALL_LAMP&s=ON'; }
    else if(item.trim() === 'Light Off') {url = 'http://172.10.1.130/cgi-bin/2.py?d=HALL_LAMP&s=OFF';  }
    else if(item.trim() === 'Tube On') {url = 'http://172.10.1.130/cgi-bin/2.py?d=HALL_TUBE&s=ON'; }
    else if(item.trim() === 'Tube Off') {url = 'http://172.10.1.130/cgi-bin/2.py?d=HALL_TUBE&s=OFF';  }
    ajax({url: url}, function(data) { console.log('Successfully Called URL. Data received: '+ data); }, function(error) { console.log('Failed to call URL. Error:  ' + error); });                
});
menu.show();

