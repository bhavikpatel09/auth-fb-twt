// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' : '236684790187848',
		'clientSecret' : '0999f3a1b4674642ce30b72b9764aacf',
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'NVmzylV1JlvWS8LFEARdOJ4eO',
		'consumerSecret' 	: 'MxmC0Ut7M9ylcZdPZFy1sJl8Pnl7J0BjLxiG8fUGRGZaLapu7t',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};