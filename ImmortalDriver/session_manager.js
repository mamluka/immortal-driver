var immortalServer = immortalServer || {};

// Singleton - There should only be one sessionManager instance
immortalServer.sessionManager = (function() {

	var _sessionCounter = 0;
	var _currentSession = 0;
	var _sessions = [];

	var _createNewSession = function() {
		casper.log('creating new session');
		var newSession = require('webpage').create();
		newSession.sessionId = _sessionCounter;
		_sessions.push(newSession);
		_currentSession = _sessionCounter;
		_sessionCounter++;
	};

	var _deleteSession = function(sessionId) {
		if (typeof (sessionId) !== 'number')
		// TODO: throw some kind of error!
			return;

		if (sessionId > _sessions.length - 1)
		// TODO: throw some kind of error! This shouldn't happen
			return;

		_sessions[sessionId] = null;
		if (_currentSession === sessionId)
			_currentSession = null;
	};

	var _setSession = function(sessionId) {
		if (typeof (sessionId) !== 'number')
		// TODO: throw some kind of error instead;
			return;

		if (sessionId > _sessions.length - 1 || _sessions[sessionId] === null)
		// TODO: throw an error
			return;

		_currentSession = sessionId;
	};

	var _defaultCapabilities = {
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

	return {
		createNewSession: _createNewSession,
		deleteSession: _deleteSession,
		setSession: _setSession,
		getCurrentSession: function() { return _sessions[_currentSession]; },
		defaultCapabilities: _defaultCapabilities
	};

})();