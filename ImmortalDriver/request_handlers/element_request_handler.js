
immortalDriver.requestHandlers.push({

	name: 'element_request_handler',

	canHandleRequest: function(request) {
		return request.splitUrl.length == 3 && (request.splitUrl[2] == 'element' || request.splitUrl[2] == 'elements');
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
				var nodeList = immortalDriver.sessionManager.getCurrentSession().evaluate(function(selectorStrategy, selectorValue) {
					switch (selectorStrategy) {
						case 'css selector':
							return document.querySelector(selectorValue);
						case 'class name':
							return document.getElementsByClassName(selectorValue);
						case 'id':
							return document.getElementById(selectorValue);
						case 'name':
							return document.getElementsByName(selectorValue);
						case 'tag name':
							return document.getElementsByTagName(selectorValue);
						//case 'link text':
						//case 'partial link text':
						//case 'xpath':
						default:
							//TODO: report appropriate error
							return false;
					}
				}, request.POST.using, request.POST.value);
				console.log('nodeList = ' + JSON.stringify(nodeList));
				response.statusCode = 200;
				immortalDriver.respond(response, pageSource);
			}
		}
	}

});