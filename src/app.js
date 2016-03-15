var UI = require('ui');
var ajax = require('ajax');
var vibe = require('ui/vibe');
var Settings = require('settings');

var items   = Settings.option('items');
console.log('items in Settings: ' + items);

var itemsjson = parse(items);

Settings.config(
  { url: 'http://www.ajithv.net/config.html' },
  function(e) {
    console.log('===================opening configurable====================');
    console.log(JSON.stringify(e));
    console.log('items set in options: ' + items);
    Settings.option('items', items);  
  },
  function(e) {
    console.log('===================closed configurable===================');
    console.log(JSON.stringify(e.options)); 
    if (e.failed) {
      console.log(e.response);
    }  
    console.log("items = " + e.options.items);  
    items =   e.options.items;
    Settings.option('items', items);   
  }
);

var menu = new UI.Menu({
    sections: [{
        items: itemsjson
    }]
});
menu.on('select', function(e) {
    vibe.vibrate('short');
    console.log('The selected item is ' + e.item.title); 
    var url = e.item.url;
    console.log("url = " + url);
    ajax({url: url}, function(data) { console.log(data); vibe.vibrate('short'); }, function(error) { console.log(error); });                
});
menu.show();

function parse(items)
{
    var itemsjson = [];
    if(items.trim() === '') return itemsjson;
    var itemsarrstr = items.split('\n');
    if(itemsarrstr.length === 0) return itemsjson;
    itemsarrstr.forEach(function(itemstr) {
        var itarr = itemstr.split(',');
        if(itarr.length !== 2) return;
        itemsjson.push({"title": itarr[0], "url": itarr[1]});
    });
    return itemsjson;
}
