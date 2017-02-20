import {Videos} from '../imports/api/videos.js';
import {Games} from '../imports/api/games.js';

Router.route('/game/:_id', function () {
  var params = this.params; // { _id: "5" }
  var id = params._id; // "5"
  this.render("eachgame", {
    data: function() { return Games.findOne({_id: this._id });}
  });
  }
);

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
