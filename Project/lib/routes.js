import {Videos} from '../imports/api/videos.js';

Router.route('/login', function () {
  this.render("login");
});

Router.route('/register', function () {
  this.render("register");
});

Router.route('/profile', function () {
  this.render("profile");
});

Router.route('/music', function () {
  this.render("music");
});

Router.route('/videos', function () {
  this.render("videos");
});

Router.route('/games', function() {
  this.render("games");
});

Router.route('/home', function() {
  this.render("home");
});

Router.route('/', function() {
  this.render("relaxx");
});
