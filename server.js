// You should be invoking phantomjs like this :
// phantomjs <server_script> <casper_script> <server_port>

var system = require('system');

if (system.args.length !== 3) {
	console.log('Unable to start ImmortalServer');
	console.log('Invalid arguments, please pass arguments as follows : ');
	console.log('phantomjs <server_script> <casper_script> <server_port>');
}
else {
	// load casperjs
	//phantom.casperPath = 'C:\\dev\\phantomjs\\casperjs';
	phantom.casperPath = system.args[1];
	phantom.injectJs(phantom.casperPath + '\\bin\\bootstrap.js');
	var casper = require('casper').create({
		verbose: true,
		logLevel: "debug"
	});
	casper.log('casper injected', 'info');
	
	// initializing web server
	phantom.injectJs("server_request_handler.js");
	var __serverPort = system.args[2];
	
	// start the web server
	var server = require('webserver').create();
	var serverRunning = server.listen(__serverPort, immortalServer.serverRequestHandler);
	
	if (!serverRunning) {
		casper.log('could not listen on port ' + __sertverPort, 'error');
		casper.log('closing phantomjs', 'info');
		phantom.exit();
	}
}