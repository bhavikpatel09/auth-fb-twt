// app/routes.js


module.exports = function (app, passport, nodemailer) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function (req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/sendmail', function (req, res, next) {
		app.mailer.send('email', {
		  to: 'bhavik.patel@radixweb.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
		  subject: 'Test Email', // REQUIRED. 
		  otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
		}, function (err) {
		  if (err) {
			// handle error 
			console.log(err);
			res.send('There was an error sending the email');
			return;
		  }
		  res.send('Email Sent');
		});
	  });


	app.get('/mail', function (req, res) {

		// render the page and pass in any flash data if it exists
		//res.render('login.ejs', { message: req.flash('loginMessage') });

		try {
			console.log("In Mail");
			const transporter = nodemailer.createTransport({
				//service: 'gmail',
				auth: {
					user: 'dotnet@mailtest.radixweb.net',
					pass: 'deep70'
				}
			});
			//console.log("transporter : " + transporter);

			const mailOptions = {
				from: 'dotnet@mailtest.radixweb.net',
				to: 'bhavik.patel@radixweb.com',
				subject: 'New Generated Password for User',
				text: `Dear User,
               This is your newly generated password from system.`
			};
			console.log('mailOptions: ' + mailOptions);

			transporter.sendMail({
				from: mailOptions.from,
				to: mailOptions.to,
				subject: mailOptions.subject,
				html: mailOptions.text
			}, function(err){
				if(err)
					console.log("Error in mail send: "+ err);
			});
			res.status(200).json({ message: 'Password has been sent.' });

		} catch (error) {
			console.log('error: ' + error);
		}
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function (req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// =====================================
	// TWITTER ROUTES =====================
	// =====================================
	// route for twitter authentication and login
	app.get('/auth/twitter', passport.authenticate('twitter'));

	// handle the callback after twitter has authenticated the user
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
