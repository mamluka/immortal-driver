
immortalDriver.sessionManager = {

	sessionCounter: 0,
	currentSession: 0,
	sessions: [],

	createNewSession: function() {
		casper.log('creating new session');
		var newSession = require('webpage').create();
		newSession.sessionId = this.sessionCounter;
		// TODO: attach an 'elements repository' to the session object
		this.sessions.push(newSession);
		this.currentSession = this.sessionCounter;
		this.sessionCounter++;
	},

	deleteSession: function(sessionId) {
		if (typeof (sessionId) != 'number')
		// TODO: throw some kind of error!
			return;

		if (sessionId > this.sessions.length - 1)
		// TODO: throw some kind of error! This shouldn't happen
			return;

		this.sessions[sessionId].release();
		casper.echo('session ' + sessionId + ' was released');
		this.sessions[sessionId] = null;
		if (this.currentSession === sessionId)
			this.currentSession = null;
	},

	setSession: function(sessionId) {
		if (typeof (sessionId) != 'number')
		// TODO: throw some kind of error instead;
			return;

		if (sessionId > this.sessions.length - 1 || this.sessions[sessionId] === null)
		// TODO: throw an error
			return;

		this.currentSession = sessionId;
	},

	getCurrentSession: function() {
		return this.sessions[this.currentSession];
	},

	defaultCapabilities: {
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
	}

};