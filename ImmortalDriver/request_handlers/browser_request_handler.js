
immortalDriver.requestHandlers.push({

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
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				//var pageSource = immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
				// TODO: don't know if this is enough -
				// TODO: we get the whole source without the '<!DOCTYPE html>' in the beginning
				//return document.getElementsByTagName('html')[0].outerHTML;
				//});
				var pageSource = immortalDriver.sessionManager.getCurrentSession().content;
				response.statusCode = 200;
				immortalDriver.respond(response, pageSource);
			}
		},
		title: {
			GET: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				var pageTitle = immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
					return document.title;
				});
				response.statusCode = 200;
				immortalDriver.respond(response, pageTitle);
			}
		}
	}

});