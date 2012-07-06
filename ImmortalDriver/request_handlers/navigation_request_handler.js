
immortalDriver.requestHandlers.push({

	name: 'navigation_request_handler',

	canHandleRequest: function(request) {
		var splitUrl = request.splitUrl;
		return splitUrl.length == 3 &&
			(splitUrl[2] == 'url' || splitUrl[2] == 'back' || splitUrl[2] == 'forward' ||
			 splitUrl[2] == 'refresh');
	},

	getMethodName: function(request) {
		return request.splitUrl[2];
	},

	methods: {
		url: {
			GET: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				var pageTitle = immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
					return document.location.href;
				});
				response.statusCode = 200;
				immortalDriver.respond(response, pageTitle);
			},
			POST: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				casper.log('request to navigate to specific url', 'INFO');
				immortalDriver.sessionManager.getCurrentSession().open(request.POST.url, function() {
					response.statusCode = 200;
					immortalDriver.respond(response);
				});
			}
		},
		back: {
			POST: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				casper.echo(JSON.stringify(immortalDriver.sessionManager.getCurrentSession()), 'DEBUG');
				immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
					document.defaultView.history.go(-1);
				});
				response.statusCode = 200;
				immortalDriver.respond(response);
			}
		},
		forward: {
			POST: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
					document.defaultView.history.go(1);
				});
				response.statusCode = 200;
				immortalDriver.respond(response);
			}
		},
		refresh: {
			POST: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
					document.defaultView.history.go();
				});
				response.statusCode = 200;
				immortalDriver.respond(response);
			}
		}
	}

});