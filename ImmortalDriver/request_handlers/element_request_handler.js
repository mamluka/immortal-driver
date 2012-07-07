
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
				// request.POST.using - this is the strategy (css selector, class name, id, name, link text, partial link text, tag name, xpath)
				// request.POST.value - this is the search value
				var nodeList = immortalDriver.sessionManager.getCurrentSession().evaluate(function(cssSelector) {
					return document.querySelector(cssSelector);
				}, request.POST.value);
				console.log('nodeList = ' + JSON.stringify(nodeList));
				response.statusCode = 200;
				immortalDriver.respond(response, pageSource);
			}
		}
	}

});