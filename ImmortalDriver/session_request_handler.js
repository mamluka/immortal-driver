
immortalServer.requestHandlers.push({

	name: 'session_request_handler',

	canHandleRequest: function(request) {
		return (request.splitUrl.length == 1 && request.splitUrl[0].indexOf('session') != -1) ||
			    request.splitUrl.length == 2;
	},

	getMethodName: function(request) {
		return request.splitUrl[0];
	},

	methods: {
		session: {
			POST: function(request, response) {
				immortalServer.sessionManager.createNewSession();
				response.statusCode = 303;
				immortalServer.respond(response);
			},
			GET: function(request, response) {
				// TODO: return actual requested session data!
				response.statusCode = 200;
				immortalServer.respond(response, immortalServer.sessionManager.defaultCapabilities);
			},
			DELETE: function(request, response) {
				// TODO: delete the requested session!
				response.statusCode = 200;
				immortalServer.respond(response, immortalServer.sessionManager.defaultCapabilities);
			}
		},
		sessions: {
			GET: function(request, response) { }
		}
	}

});