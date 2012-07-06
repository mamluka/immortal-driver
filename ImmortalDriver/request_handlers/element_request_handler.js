
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
				// request.POST.using - this is the strategy (css selected, class name, id, name, link text, partial link text, tag name, xpath)
				// request.POST.value - this is the search value
			}
		}
	}

});