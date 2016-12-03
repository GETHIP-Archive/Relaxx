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
