import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {Videos} from '../imports/api/videos.js';
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

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    document.getElementById('errorfound').innerHTML = "";
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      username: username,
      password: password
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

async function welcomemessage()
{
  currentUsername = Meteor.user().username;
  document.getElementById("userwelcomemessage").innerHTML = "Welcome, " + currentUsername + "!";
  return currentUsername;
}

async function currentusernametime()
{
  while(Meteor.user() == null)
  {
    await sleep(5);
  }
  currentUsername = Meteor.user().username;
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
  if((Meteor.user() !== null))
  {
    currentusernametime();
  }
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

Template.videos.events({
  'submit #addVideo'(event) {
    event.preventDefault();
    var target = event.target;
    //const videoName = event.videoName.value;
    var videoLink = target.videoLink.value;
    var tags = target.tags.value;
    var alltags = tags.replace(/ /g,"");
    alltags = alltags.split(",");
    console.log(alltags);
    // Insert a video into the collection
    Videos.insert({
      videoLink: videoLink,
      alltags: alltags
    });

    target.videoLink.value  = '';
    target.tags.value  = '';
  },

  'submit #addComment'(event) {
    event.preventDefault();

    const target = event.target;
    var name = target.name.value;
    var comment = target.comment.value;

    document.getElementById("names").innerHTML = "<strong>" + name + "</strong>";
    document.getElementById("comments").innerHTML = comment;

    target.name.value = '';
    target.comment.value = '';
  },
});

Template.videos.helpers({
  names: function() {
    return name;
  },
  comments: function() {
    return "<strong>" + comment + "</strong>";
  },
  videos: function() {
    return Videos.find();
  },
  /*
  video() {
    let vid = Videos.findOne({userId: Router.current().params._id });
    return vid;
  }
  */
  searchtags: function(searchalltags)
  {
    result = false;
    for(n in searchalltags)
    {
      if(searchalltags[n] === "Nature")
      {
        result = true;
      }
    }
    return result;
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
