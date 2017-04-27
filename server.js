const express = require('express'),
  app = express(),
  ejs = require('ejs'),
  http = require('http'),
  passport = require('passport'),
  util = require('util'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  logger = require('logger'),
  methodOverride = require('method-override'),
  LinkedInStrategy = require('passport-linkedin').Strategy,
  isomorphicFetch = require('isomorphic-fetch'),
  Sequelize = require('sequelize'),
  port = process.env.PORT || 8080;
  require('es6-promise').polyfill();

  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
	app.set('src', __dirname + '/src');


  // app.use(logger());
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat', name: 'id' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());

  var LINKEDIN_API_KEY = "77z6i13ivps0pq";
  var LINKEDIN_SECRET_KEY = "3yynGlqLel1da9bq";

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete LinkedIn profile is
  //   serialized and deserialized.
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  // Use the LinkedInStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
  //   invoke a callback with a user object.
  passport.use(new LinkedInStrategy({
      consumerKey: LINKEDIN_API_KEY,
      consumerSecret: LINKEDIN_SECRET_KEY,
      callbackURL: "/auth/linkedin/callback"
    },
    function(token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ));

  function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
	  return next();
  }
  else
    res.redirect('/login');
}

  app.get('/', function(req, res){
    res.render('index', { user: req.user });
  });

  app.get('/account', ensureAuthenticated, function(req, res){
	  fetch('https://api.linkedin.com/v1/people/~?format=json')
	  .then(res => {
		//   console.log(res);
		  return res;
	  })
	  .then(result => {
		 console.log(result);
	  })
	  .catch(err => {
		  console.log('error : ', err);
	  });

    res.render('account', { user: req.user });
  });

  app.get('/login', function(req, res){
    res.render('login', { user: req.user });
  });

  // GET /auth/linkedin
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in LinkedIn authentication will involve
  //   redirecting the user to linkedin.com.  After authorization, LinkedIn will
  //   redirect the user back to this application at /auth/linkedin/callback
  app.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res){
      // The request will be redirected to LinkedIn for authentication, so this
      // function will not be called.
    });

  // GET /auth/linkedin/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });



app.listen(port, (req, res) => {
  console.log('Server is Ok. Listening to port ' + port);
});
