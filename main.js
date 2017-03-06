import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {Videos} from '../imports/api/videos.js';
import {Musics} from '../imports/api/musics.js';
import {Soundclouds} from '../imports/api/soundclouds.js';
import {Games} from '../imports/api/games.js';
import './main.html';

import '../imports/startup/accounts-config.js';

var timerid = setInterval(timer, 1000);
var up = true;
var timevalue = 0;
var increment = 1;
var floor = 0;

var hrs = 0;
var mins = 0;
var secs = 0;

var starttimevalue = 0;

var name = "10/10"

var username = ""
var password = ""
var currentUsername = ""

var videosearchingtag = null;
var alltagbuttons = [""];

var musicsearchingtag = null;
var soundcloudsearchingtag = null;
var allmusictagbuttons = [""];

/*
Template.navbar.onRendered({
  var modal = document.getElementById('timesUpBox');
  var testButton = document.getElementById("testingButton");
  var closing = document.getElementsByClassName("close")[0];

  testButton.onclick = function()
  {
  modal.style.display = "block";
  };
  span.onclick = function() {
      modal.style.display = "none";
  };

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };
});
*/

Template.carousel.rendered = function() {
  $('#carousel').slick({
    dots: true,
    arrows: true,
    autoplay: true,
    speed: 500,
  });
}

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    document.getElementById('errorfound').innerHTML = "";
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      username: username,
      password: password,
	  profile: {pictureurl: "https://media0.giphy.com/media/UdwPkSRko9NpS/200_s.gif"}
    },
    function(error)
    {
      if(error)
      {
        console.log(error.reason); // Output error if registration fails
        founderror(error.reason);
      }
      else
      {
        Router.go('home'); // Redirect user if registration succeeds
        console.log("New account created:", currentUsername);
      }
    });
    currentusername();
  }
});


Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    document.getElementById('errorfound').innerHTML = "";
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(username, password, function(error){
    if(error)
    {
      console.log(error.reason);
      founderror(error.reason);
    }
    else
    {
      Router.go("home");
    }
    })
    currentusername();
  }
});

Template.navbar.events({
  'click .logout': function(event){
    Meteor.logout();
    Router.go('login');
    console.log("Logged out");
  }
});
Template.profile.events({
	'submit #profileChange'(event){
		event.preventDefault();
		var target = event.target;
		var firstName = target.firstName.value;
		var lastName = target.lastName.value;
		var perDesc = target.perDesc.value;
		var pictureurl = target.pictureurl.value;
		Meteor.users.update({_id: Meteor.userId()}, {$set:{"profile.firstName": firstName}});
		Meteor.users.update({_id: Meteor.userId()}, {$set:{"profile.lastName": lastName}});
		Meteor.users.update({_id: Meteor.userId()}, {$set:{"profile.perDesc": perDesc}});
		Meteor.users.update({_id: Meteor.userId()}, {$set:{"profile.pictureurl": pictureurl}});
		console.log(Meteor.user());
		window.alert("Your changes have been saved");
	}
});
Template.profile.helpers({
user: function() {
	return Meteor.user();
	
}		
})
function founderror(errorreason)
{
  document.getElementById('errorfound').innerHTML = "*" + errorreason;
  /*
  if(error.reason === "Incorrect password")
  {
    document.getElementById('errorpassword').innerHTML = "*" + error.reason;
  }
  else if(error.reason === "User not found")
  {
    document.getElementById('errorusername').innerHTML = "*" + error.reason;
  }
  else
  {
    document.getElementById('errorusername').innerHTML = "*" + error.reason;
  }
  */
}

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function currentusername()
{
  while(Meteor.user() == null)
  {
    await sleep(5);
  }
  console.log(Meteor.user());
  currentUsername = Meteor.user().username;
  console.log("Logged in as", currentUsername);
  document.getElementById("currentUsername").innerHTML = '<a href="/profile">' + currentUsername + '</a>';
  return currentUsername;
}

Template.navbar.events({
  'submit #newTimer'(event) {

  event.preventDefault();

  if(timevalue != floor)
  {
    clearInterval(timerid);
  }

  const target = event.target;
  timevalue = target.time.value;
  starttimevalue = target.time.value;

  if(timevalue < 0)
  {
    timevalue = timevalue - (timevalue * 2);
    starttimevalue = timevalue;
  }

  timerid = setInterval(timer, 1000);
  up = false;
  displaytimer();
  displaytimerborder();

  target.time.value = '';
  },
});

function timer()
{
  if (up == false && timevalue > floor)
  {
    timevalue -= increment;
  }
  else if (up == true)
  {
    timevalue += increment;
  }

  displaytimerborder();
  displaytimer();
  if(Router.current().route.getName() === "profile")
  {
    welcomemessage();
  }

  if (timevalue == floor)
  {
    window.alert("Your timer has run out");
    clearInterval(timerid);
  }
}

Template.navbar.helpers({
  times: function() {
    return ((mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs));
  },
  currentusername: function() {
    currentUsername = Meteor.user().username;
    return currentUsername;
  }
});

function displaytimer(){
  hrs = Math.floor(timevalue / 3600);
  mins = Math.floor(timevalue / 60);
  secs = timevalue % 60;
  //(condition?if true:if false)
  // console.log((mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs));
  document.getElementById('timerdisplay').innerHTML = "<big>" + ((mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs)) + "</big>";
}
//(hours != 0 ? hours + ':' : ) +

function displaytimerborder(){
  if(timevalue > (starttimevalue * .75) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green";
  }
  else if (timevalue > (starttimevalue * .5) && timevalue <= (starttimevalue * .75) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green red green green";
  }
  else if (timevalue > (starttimevalue * .25) && timevalue <= (starttimevalue * .5) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green red red green";
  }
  else if ((timevalue > 0) && timevalue <= (starttimevalue * .25) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green red red red";
  }
  else if (timevalue == 0 && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "red";
  }
}

Template.games.events({
  'submit #addGame'(event) {
    event.preventDefault();
    var target = event.target;
    //const videoName = event.videoName.value;
    var gameLink = target.gameLink.value;
    var gameName = target.gameName.value;
    var gamePic = target.gamePic.value;
    var gametags = target.gametags.value;
    var gamealltags = gametags.replace(/ /g,"");
    gamealltags = gamealltags.split(",");
    console.log(gamealltags);
    // Insert a video into the collection
    Games.insert({
      gameLink: gameLink,
      gameName: gameName,
      gamePic: gamePic,
      gamealltags: gamealltags
    });

    target.gameLink.value  = '';
    target.gameName.value  = '';
    target.gamesPic.value  = '';
    target.gametags.value  = '';
  },

  'submit #gameaddComment'(event) {
    event.preventDefault();

    const target = event.target;
    var gamename = target.gamename.value;
    var gamecomment = target.gamecomment.value;

    document.getElementById("gamenames").innerHTML = "<strong>" + gamename + "</strong>";
    document.getElementById("gamecomments").innerHTML = gamecomment;

    target.gamename.value = '';
    target.gamecomment.value = '';
  },
});

Template.games.helpers({
  gamesnames: function() {
    return gamename;
  },
  gamescomments: function() {
    return "<strong>" + gamecomment + "</strong>";
  },
  games: function() {
    return Games.find();
  },
  gamessearchtags: function(searchalltags)
  {
    result = false;
    for(n in searchalltags)
    {
      if(searchalltags[n] === gamesearchingtag)
      {
        result = true;
      }
    }
    return result;
  }
});

Template.eachgame.helpers({
  eachgame() {
  let gam = Games.findOne({_id: Router.current().params._id });
  return gam;
  }
});

Template.videos.events({
  'submit #addVideo'(event) {
    event.preventDefault();
    var target = event.target;
    //const videoName = event.videoName.value;
    var videoLink = target.videoLink.value;
    var videotags = target.videotags.value;
    var videoalltags = videotags.replace(/ /g,"");
    videoalltags = videoalltags.split(",");
    console.log(videoalltags);
    // Insert a video into the collection
    Videos.insert({
      videoLink: videoLink,
      videoalltags: videoalltags
    });

    target.videoLink.value  = '';
    target.videotags.value  = '';
  },

  /*
  'submit #addComment'(event) {
    event.preventDefault();

    const target = event.target;
    var videoname = target.videoname.value;
    var videocomment = target.videocomment.value;

    document.getElementById("videonames").innerHTML = "<strong>" + videoname + "</strong>";
    document.getElementById("videocomments").innerHTML = videocomment;

    target.videoname.value = '';
    target.videocomment.value = '';
  },
  */
});

Template.videos.helpers({
  /*
  videonames: function() {
    return videoname;
  },
  videocomments: function() {
    return "<strong>" + videocomment + "</strong>";
  },
  */
  videos: function() {
    return Videos.find();
  },
  videouniquetags: function(findingalltags)
  {
    result = true;
    i = alltagbuttons.length;
    if(findingalltags == null)
    {
      console.log(i);
    }
    while(i--)
    {
      if(alltagbuttons[i] === findingalltags)
      {
        result = false;
      }
    }
    if(result == true)
    {
      alltagbuttons[alltagbuttons.length + 1] = findingalltags;
    }
    return result;
  },
  clearuniquetags: function()
  {
    alltagbuttons = [""];
  }
});

Template.searchvideos.helpers({
  videos: function() {
    return Videos.find();
  },
  videosearchtags: function(searchalltags)
  {
    result = false;
    for(n in searchalltags)
    {
      if(searchalltags[n] === Router.current().params._tag)
      {
        result = true;
      }
    }
    return result;
  },
  videouniquetags: function(findingalltags)
  {
    result = true;
    i = alltagbuttons.length;
    while(i--)
    {
      if(alltagbuttons[i] === findingalltags)
      {
        result = false;
      }
    }
    if(result == true)
    {
      alltagbuttons[alltagbuttons.length + 1] = findingalltags;
    }
    return result;
  },
  clearuniquetags: function()
  {
    alltagbuttons = [""];
  }
});

/*
Template.videos.events({
  'submit #addComment'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const comment = target.comment.value;
    //let prof = Videos.findOne({userId: Router.current().params._id });
    let commentToVideo = {
      posterFullName: name,
      comment: comment
    };
    Videos.update(
      //_id: prof._id},
      {$push: {comments : commentToVideo}}
    )
  },
});
*/

Template.music.events({
  'submit #addMusic'(event) {
    event.preventDefault();
    var target = event.target;
    //const musicName = event.musicName.value;
    var musicLink = target.musicLink.value;
    var musictags = target.musictags.value;
    var musicalltags = musictags.replace(/ /g,"");
    musicalltags = musicalltags.split(",");
    console.log(musicalltags);
    // Insert a music into the collection
    Musics.insert({
      musicLink: musicLink,
      musicalltags: musicalltags
    });

    target.musicLink.value  = '';
    target.musictags.value  = '';
  },

  'submit #addSoundcloud'(event) {
    event.preventDefault();
    var target = event.target;
    //const musicName = event.musicName.value;
    var soundcloudLink = target.soundcloudLink.value;
    var soundcloudtags = target.soundcloudtags.value;
    var soundcloudalltags = soundcloudtags.replace(/ /g,"");
    soundcloudalltags = soundcloudalltags.split(",");
    console.log(soundcloudalltags);
    // Insert a soundcloud into the collection
    Soundclouds.insert({
      soundcloudLink: soundcloudLink,
      soundcloudalltags: soundcloudalltags
    });

    target.soundcloudLink.value  = '';
    target.soundcloudtags.value  = '';
  },

  /*
  'submit #addComment'(event) {
    event.preventDefault();

    const target = event.target;
    var musicname = target.musicname.value;
    var musiccomment = target.musiccomment.value;

    document.getElementById("musicnames").innerHTML = "<strong>" + musicname + "</strong>";
    document.getElementById("musiccomments").innerHTML = musiccomment;

    target.musicname.value = '';
    target.musiccomment.value = '';
  },
  */
});

Template.searchmusic.events({
  'submit #addMusic'(event) {
    event.preventDefault();
    var target = event.target;
    //const musicName = event.musicName.value;
    var musicLink = target.musicLink.value;
    var musictags = target.musictags.value;
    var musicalltags = musictags.replace(/ /g,"");
    musicalltags = musicalltags.split(",");
    console.log(musicalltags);
    // Insert a music into the collection
    Musics.insert({
      musicLink: musicLink,
      musicalltags: musicalltags
    });

    target.musicLink.value  = '';
    target.musictags.value  = '';
  },

  'submit #addSoundcloud'(event) {
    event.preventDefault();
    var target = event.target;
    //const musicName = event.musicName.value;
    var soundcloudLink = target.soundcloudLink.value;
    var soundcloudtags = target.soundcloudtags.value;
    var soundcloudalltags = soundcloudtags.replace(/ /g,"");
    soundcloudalltags = soundcloudalltags.split(",");
    console.log(soundcloudalltags);
    // Insert a soundcloud into the collection
    Soundclouds.insert({
      soundcloudLink: soundcloudLink,
      soundcloudalltags: soundcloudalltags
    });

    target.soundcloudLink.value  = '';
    target.soundcloudtags.value  = '';
  },

  /*
  'submit #addComment'(event) {
    event.preventDefault();

    const target = event.target;
    var musicname = target.musicname.value;
    var musiccomment = target.musiccomment.value;

    document.getElementById("musicnames").innerHTML = "<strong>" + musicname + "</strong>";
    document.getElementById("musiccomments").innerHTML = musiccomment;

    target.musicname.value = '';
    target.musiccomment.value = '';
  },
  */
});

Template.music.helpers({
  /*
  musicnames: function() {
    return musicname;
  },
  musiccomments: function() {
    return "<strong>" + musiccomment + "</strong>";
  },
  */
  musics: function() {
    return Musics.find();
  },
  musicuniquetags: function(musicfindingalltags)
  {
    result = true;
    i = musicalltagbuttons.length;
    if(musicfindingalltags == null)
    {
      console.log(i);
    }
    while(i--)
    {
      if(musicalltagbuttons[i] === musicfindingalltags)
      {
        result = false;
      }
    }
    if(result == true)
    {
      musicalltagbuttons[musicalltagbuttons.length + 1] = musicfindingalltags;
    }
    return result;
  },
  clearuniquetags: function()
  {
    musicalltagbuttons = [""];
  },
  soundclouds: function() {
    return Soundclouds.find();
  },
  soundclouduniquetags: function(soundcloudfindingalltags)
  {
    result = true;
    i = musicalltagbuttons.length;
    if(soundcloudfindingalltags == null)
    {
      console.log(i);
    }
    while(i--)
    {
      if(musicalltagbuttons[i] === soundcloudfindingalltags)
      {
        result = false;
      }
    }
    if(result == true)
    {
      musicalltagbuttons[musicalltagbuttons.length + 1] = soundcloudfindingalltags;
    }
    return result;
  }
});

Template.searchmusic.helpers({
  musics: function() {
    return Musics.find();
  },
  musicsearchtags: function(musicsearchalltags)
  {
    result = false;
    if(musicsearchalltags == null)
    {
      result = true;
    }
    else
    {
      for(n in musicsearchalltags)
      {
        if(musicsearchalltags[n] === Router.current().params._tag)
        {
          result = true;
        }
      }
    }
    return result;
  },
  musicuniquetags: function(musicfindingalltags)
  {
    result = true;
    i = musicalltagbuttons.length;
    if(musicfindingalltags == null)
    {
      console.log(i);
    }
    while(i--)
    {
      if(musicalltagbuttons[i] === musicfindingalltags)
      {
        result = false;
      }
    }
    if(result == true)
    {
      musicalltagbuttons[musicalltagbuttons.length + 1] = musicfindingalltags;
    }
    return result;
  },
  clearuniquetags: function()
  {
    musicalltagbuttons = [""];
  },
  soundclouds: function() {
    return Soundclouds.find();
  },
  soundcloudsearchtags: function(soundcloudsearchalltags)
  {
    result = false;
    if(soundcloudsearchalltags == null)
    {
      result = true;
    }
    else
    {
      for(n in soundcloudsearchalltags)
      {
        if(soundcloudsearchalltags[n] === Router.current().params._tag)
        {
          result = true;
        }
      }
    }
    return result;
  },
  soundclouduniquetags: function(soundcloudfindingalltags)
  {
    result = true;
    i = musicalltagbuttons.length;
    if(soundcloudfindingalltags == null)
    {
      console.log(i);
    }
    while(i--)
    {
      if(musicalltagbuttons[i] === soundcloudfindingalltags)
      {
        result = false;
      }
    }
    if(result == true)
    {
      musicalltagbuttons[musicalltagbuttons.length + 1] = soundcloudfindingalltags;
    }
    return result;
  }
});
