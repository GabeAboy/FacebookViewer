var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
var port = 3000;

app.use(session({secret: 'keyboardcat'}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new FacebookStrategy({
  clientID: '1147370528651704',
  clientSecret: 'b112384364a10b11aaf7c4e8ec58ccd4',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  console.log(profile);
  return done(null, profile);
}));

app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
app.get('/me',function(req, res) {
  req.send(req.user);
})
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {

  done(null, obj);
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
