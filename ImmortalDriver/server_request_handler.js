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
			handler.handleRequest(request, response);
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



	/*
	if (splitUrl.length === 1) { // /session, /sessions, /status
	if (splitUrl[0] === 'session' && method === 'POST') { // request to start a new session
	casper.log('got session request');
	immortalServer.sessionManager.createNewSession();
	response.statusCode = 303;
	immortalServer.respond(response);
	}
	else if (splitUrl[0] === 'sessions') {

	}
	else if (splitUrl[0] === 'status') {

	}
	}
	else if (splitUrl.length === 2) { // /session/:sessionId (GET/DELETE)
	if (splitUrl[0] === 'session' && typeof (splitUrl[1]) === 'number') {
	if (method === 'GET') {
	response.statusCode = 200;
	immortalServer.respond(response, immortalServer.sessionManager.defaultCapabilities);
	}
	else if (method === 'DELETE') {
	response.statusCode = 200;
	immortalServer.respond(response, immortalServer.sessionManager.defaultCapabilities);
	}
	}
	}
	else if (splitUrl[0] === 'session') {

	var requestedSessionId = parseInt(splitUrl[1]);
	// TODO: check that requestedSessionId is really a number - if not then throw some error!
	immortalServer.sessionManager.setSession(requestedSessionId);

	casper.log('session request received.');
	casper.log('splitUrl[2] = ' + splitUrl[2] + '; method = ' + method);

	if (splitUrl[2] === 'url' && method === 'GET') { // get page title
	var pageTitle;
	pageTitle = immortalServer.sessionManager.getCurrentSession().evaluate(function() {
	return document.location.href;
	});
	responseStatusCode = 200;
	immortalServer.respond(response, pageTitle);
	}
	else if (splitUrl[2] === 'url' && method === 'POST') { // navigate to url
	casper.log('request to navigate to specific url', 'INFO');
	immortalServer.sessionManager.getCurrentSession().open(POST.url, function() {
	response.StatusCode = 200;
	immortalServer.respond(response);
	});
	}
	else if (splitUrl[2] === 'element' || splitUrl === 'elements') {

	}
	}
	else {
	// TODO: this shouldn't happen- throw some error maybe
	// TODO: dump all the data we have on the request so it will help us know what went wrong...
	casper.log(splitUrl[0]);
	casper.log(splitUrl[1] + ' typeof=' + typeof (splitUrl[1]));
	casper.log(splitUrl[2]);
	casper.log('length' + splitUrl.length);
	}
	*/
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