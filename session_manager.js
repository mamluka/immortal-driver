var immortalServer = immortalServer || {};

immortalServer.sessionCounter = 0;

immortalServer.sessionManager = function() {
	
	this.Capabilities = {
		browserName: 'phantomjs',
		version: phantom.version.major + '.' + phantom.version.minor + '.' + phantom.version.patch,
		platform: phantom.defaultPageSettings.userAgent,
		javascriptEnabled: true,
		takesScreenshot: true,
		handlesAlerts: true,
		databaseEnabled: false,
		locationContextEnabled: false,
		applicationCacheEnabled: false,
		browserConnectionEnabled: false,
		cssSelectorsEnabled: true,
		webStorageEnabled: false,
		rotatable: false,
		acceptSslCerts: false,
		nativeEvents: true,
		proxy: { proxyType: 'direct' }
	};
	
	this.getCurrentSession = function() {
		return immortalServer.sessionCounter;
	};
	
};