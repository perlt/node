var config = require('./conf.js').conf;
var fs = require('fs');
var child_process = require('child_process');

var filelen = config.src.length;
var count = 0;
var filedata = '';


function readFileCallback(err, data){
	if (err) throw err;
	filedata += data.toString();
	notify(); 
}

function notify() {
	count++;
	if (count == filelen) {
		fs.writeFile('./cache/min.js', filedata, 'utf-8', function(err){
			if (err) throw err;
			var command = 'java -jar ./bin/yuicompressor-2.4.2.jar --type js --charset utf-8 ./cache/min.js > '+config.target;
			console.log(command);
			exec(command);
		});
	}
}

function exec(command) {
	child_process.exec(command, function(err, stdout, stderr){
		if(err) throw err;
		console.log('yuicompress successfully!');
	});
}

for(var i=0; i < filelen; i++) {
	fs.readFile(config.src[i], readFileCallback);
}