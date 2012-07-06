
immortalDriver.requestHandlers.push({

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
				immortalDriver.sessionManager.createNewSession();
				response.statusCode = 303;
				immortalDriver.respond(response);
			},
			GET: function(request, response) {
				// TODO: return actual requested session data!
				response.statusCode = 200;
				immortalDriver.respond(response, immortalDriver.sessionManager.defaultCapabilities);
			},
			DELETE: function(request, response) {
				immortalDriver.sessionManager.deleteSession();
				response.statusCode = 200;
				immortalDriver.respond(response, immortalDriver.sessionManager.defaultCapabilities);
			}
		},
		sessions: {
			GET: function(request, response) { }
		}
	}

});