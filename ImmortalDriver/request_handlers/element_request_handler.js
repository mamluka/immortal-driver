
immortalDriver.requestHandlers.push({

	name: 'element_request_handler',

	canHandleRequest: function(request) {
		return request.splitUrl.length == 3 && request.splitUrl[2] == 'element';
	},

	getMethodName: function(request) {
		return request.splitUrl[2];
	},

	methods: {
		element: {
			POST: function(request, response) {
				immortalDriver.sessionManager.setSession(parseInt(request.splitUrl[1]));
				console.log('incoming element request');
				var p = request.POST;
				// request.POST.using - this is the strategy (css selector, class name, id, name, link text, partial link text, tag name, xpath)
				// request.POST.value - this is the search value
				var nodeList = immortalDriver.sessionManager.getCurrentSession().evaluate(function() {
					return document.querySelector('body div#main h2');
					// TODO: if i change the string inside querySelector to be p.value, this doesn't work.
					// TODO: why can't i use the 'request' variable inside the 'evaluate' method scope ???
				});
				console.log('nodeList = ' + JSON.stringify(nodeList));
				response.statusCode = 200;
				immortalDriver.respond(response, pageSource);
			}
		}
	}

});