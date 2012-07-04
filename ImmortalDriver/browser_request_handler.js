
immortalServer.requestHandlers.push({

	name: 'browser_request_handler',

	canHandleRequest: function(request) {
		var splitUrl = request.splitUrl;
		// TODO: need to add much more request options here...
		return splitUrl.length == 3 && (splitUrl[2] == 'source' || splitUrl[2] == 'title');
	},

	getMethodName: function(request) {
		return request.splitUrl[2];
	},

	methods: {
		source: {
			GET: function(request, response) {
				immortalServer.sessionManager.setSession(parseInt(request.splitUrl[1]));
				var pageTitle = immortalServer.sessionManager.getCurrentSession().evaluate(function() {
					return document.title;
				});
				responseStatusCode = 200;
				immortalServer.respond(response, pageTitle);
			}
		},
		title: {
			GET: function(request, response) {

			}
		}
	}

});