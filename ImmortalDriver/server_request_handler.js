var immortalServer = immortalServer || {};

// add all the request handlers we have here
immortalServer.requestHandlers = [];
phantom.injectJs("session_request_handler.js");
phantom.injectJs("navigation_request_handler.js");
//phantom.injectJs("_request_handler.js");
//phantom.injectJs("_request_handler.js");

immortalServer.serverRequestHandler = function(request, response) {
	casper.echo('');
	casper.echo('incoming request => ' + JSON.stringify(request), 'DEBUG');

	// parse the request url
	var requestedUrl = request.url;
	var method = request.method;
	var splitUrl = requestedUrl.substring(1).split('/');
	request.splitUrl = splitUrl;

	var POST = (typeof (request.post) != 'undefined' && request.post != '') ? JSON.parse(request.post) : null;
	request.POST = POST;

	var requestHandled = false;

	immortalServer.requestHandlers.forEach(function(handler, i) {
		casper.echo(JSON.stringify(handler), 'INFO');
		if (handler.canHandleRequest(request)) {
			casper.echo('request being handled by ' + handler.name, 'DEBUG');
			//handler.handleRequest(request, response);
			// TODO: add callbacks for 'pre-request' and 'post-request' methods
			// TODO: and then refactor the navigation_request_handler
			handler['methods'][handler.getMethodName(request)][request.method](request, response);
			requestHandled = true;
			return;
		}
	});

	if (!requestHandled) {
		// TODO: we couldn't find a proper request handler - return some message...
		casper.log(splitUrl[0]);
		casper.log(splitUrl[1] + ' typeof=' + typeof (splitUrl[1]));
		casper.log(splitUrl[2]);
		casper.log('length' + splitUrl.length);
	}


	// TODO: catch unsupported requests here
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

	casper.echo('');
	casper.echo('response sent => ' + JSON.stringify(returnObject), 'DEBUG');
};