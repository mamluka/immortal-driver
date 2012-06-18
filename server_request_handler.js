var immortalServer = immortalServer || {};

immortalServer.serverRequestHandler = function(request, response) {
	casper.echo('incoming request => ' + JSON.stringify(request), 'DEBUG');
	
	// parse the request url
	var requestedUrl = request.url;
	var splitUrl = requestedUrl.substring(1).split('/');
	
	if (splitUrl.length == 1) { // /session, /sessions, /status
		response.statusCode = 303;
		immortalServer.respond(response);
	}
	else if (splitUrl.length == 2) { // /session/:sessionId (GET/POST)
		response.statusCode = 200;
		immortalServer.respond(response, {javascriptEnabled:true});
	}
	else {
		
	}
	
};

immortalServer.respond = function(response, value, status, sessionId) {
	response.setHeader("Cache", "no-cache");
	response.setHeader("Content-Type", "application/json;charset=utf-8");
	
	var returnObject = {
		sessionId: sessionId || 1, // TODO: retrieve this from our session manager
		status: status || 0, // default status is 'success'
		value: value || {} // default is an empty json object
	};
	
	response.write(JSON.stringify(returnObject));
	response.close();
	
	casper.echo('response sent => ' + JSON.stringify(returnObject), 'DEBUG');
};