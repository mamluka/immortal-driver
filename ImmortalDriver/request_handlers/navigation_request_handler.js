
immortalServer.requestHandlers.push({

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
				immortalServer.sessionManager.setSession(parseInt(request.splitUrl[1]));
				var pageTitle = immortalServer.sessionManager.getCurrentSession().evaluate(function() {
					return document.location.href;
				});
				response.StatusCode = 200;
				immortalServer.respond(response, pageTitle);
			},
			POST: function(request, response) {
				immortalServer.sessionManager.setSession(parseInt(request.splitUrl[1]));
				casper.log('request to navigate to specific url', 'INFO');
				immortalServer.sessionManager.getCurrentSession().open(request.POST.url, function() {
					response.StatusCode = 200;
					immortalServer.respond(response);
				});
			}
		},
		back: {
			POST: function(request, response) {
				immortalServer.sessionManager.setSession(parseInt(request.splitUrl[1]));
				casper.echo(JSON.stringify(immortalServer.sessionManager.getCurrentSession()), 'DEBUG');
				immortalServer.sessionManager.getCurrentSession().evaluate(function() {
					document.defaultView.history.go(-1);
				});
				response.StatusCode = 200;
				immortalServer.respond(response);
			}
		},
		forward: {
			POST: function(request, response) {
				immortalServer.sessionManager.setSession(parseInt(request.splitUrl[1]));
				immortalServer.sessionManager.getCurrentSession().evaluate(function() {
					document.defaultView.history.go(1);
				});
				response.StatusCode = 200;
				immortalServer.respond(response);
			}
		},
		refresh: {
			POST: function(request, response) {
				immortalServer.sessionManager.setSession(parseInt(request.splitUrl[1]));
				immortalServer.sessionManager.getCurrentSession().evaluate(function() {
					document.defaultView.history.go();
				});
				response.StatusCode = 200;
				immortalServer.respond(response);
			}
		}
	}

});