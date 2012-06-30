
immortalServer.requestHandlers.push({

	name: 'session_request_handler',

	canHandleRequest: function(request) {
		return (request.splitUrl.length == 1 && request.splitUrl[0].indexOf('session') != -1) ||
			    request.splitUrl.length == 2;
	},

	handleRequest: function(request, response) {
		var splitUrl = request.splitUrl;

		if (splitUrl.length == 1 && splitUrl[0] == 'session' && request.method == 'POST') {
			immortalServer.sessionManager.createNewSession();
			response.statusCode = 303;
			immortalServer.respond(response);
		}
		else if (splitUrl.length == 2 && splitUrl[0] == 'session' && typeof (splitUrl[1]) == 'number') {
			if (request.method == 'GET') {
				// TODO: return actual requested session data!
				response.statusCode = 200;
				immortalServer.respond(response, immortalServer.sessionManager.defaultCapabilities);
			}
			else if (request.method == 'DELETE') {
				// TODO: delete the requested session!
				response.statusCode = 200;
				immortalServer.respond(response, immortalServer.sessionManager.defaultCapabilities);
			}
		}

	}

});