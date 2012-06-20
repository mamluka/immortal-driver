var immortalServer = immortalServer || {};

immortalServer.serverRequestHandler = function(request, response) {
	casper.echo('');
	casper.echo('incoming request => ' + JSON.stringify(request), 'DEBUG');

	// parse the request url
	var requestedUrl = request.url;
	var method = request.method;
	var splitUrl = requestedUrl.substring(1).split('/');

	if (splitUrl.length === 1) { // /session, /sessions, /status
		if (splitUrl[0] === 'session' && method === 'POST') { // request to start a new session
			casper.log('got session request');
			casper.log(typeof immortalServer.sessionManager);
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
	else if (splitUrl[0] === 'session' && typeof (splitUrl[1]) === 'number') {

		immortalServer.sessionManager.setSession(splitUrl[1]);

		if (splitUrl[2] === 'url' && method === 'GET') { // get page title
			var pageTitle;
			pageTitle = immortalServer.sessionManager.currentSession.evaluate(function() {
				return document.title;
			});
			responseStatusCode = 200;
			immortalServer.respond(response, pageTitle);
		}
		else if (splitUrl[2] === 'url' && method === 'POST') { // navigate to url
			immortalServer.sessionManager.currentSession.open(request.post.url, function() {
				response.StatusCode = 200;
				immortalServer.respond(response);
			});
		}
		else if (splitUrl[2] === 'element' || splitUrl === 'elements') {

		}
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