// You should be invoking phantomjs like this :
// phantomjs <server_script> <casper_library> <server_port>

var system = require('system');

if (system.args.length !== 3) {
	console.log('Unable to start ImmortalServer');
	console.log('Invalid arguments, please pass arguments as follows : ');
	console.log('phantomjs <server_script> <casper_library> <server_port>');
}
else {
	// load casperjs
	//phantom.casperPath = 'C:\\dev\\phantomjs\\casperjs';
	phantom.casperPath = system.args[1];
	phantom.injectJs(phantom.casperPath + '\\bin\\bootstrap.js');
	var casper = require('casper').create({
		// TODO: make these configurable somehow
		verbose: true,
		logLevel: "debug",
		timeout: 30000
	});
	casper.echo('casper injected', 'INFO');
	
	// initializing web server
	phantom.injectJs("server_request_handler.js");
	var __serverPort = system.args[2];
	
	// start the web server
	var server = require('webserver').create();
	var serverRunning = server.listen(__serverPort, immortalServer.serverRequestHandler);
	
	if (!serverRunning) {
		casper.echo('could not listen on port ' + __serverPort, 'ERROR');
		casper.echo('closing phantomjs', 'INFO');
		phantom.exit();
	}
}