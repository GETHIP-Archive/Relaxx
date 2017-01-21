import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {Videos} from '../imports/api/videos.js';
import './main.html';

var timerid = setInterval(timer, 1000);
var up = true;
var timevalue = 0;
var increment = 1;
var floor = 0;

var hrs = 0;
var mins = 0;
var secs = 0;

var starttimevalue = 0;

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

  if (timevalue == floor)
  {
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
  console.log((mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs));
  document.getElementById('timerdisplay').innerHTML = "<big>" + ((mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs)) + "</big>";
}
//(hours != 0 ? hours + ':' : ) +
function displaytimerborder(){
  if (timevalue > (starttimevalue / 2) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green white";
  }
  else if (timevalue > 0 && timevalue < (starttimevalue / 2) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green white red white";
  }
  else if (timevalue == 0 && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "red white";
  }

/*
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
  else if (timevalue > 0) && timevalue <= (starttimevalue * .25) && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "green red red red";
  }
  else if (timevalue == 0 && up == false)
  {
    document.getElementById("timerdisplay").style.borderColor = "red";
  }
*/
}

Template.videos.events({
  'submit #addComment'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const comment = target.comment.value;
    let prof = Videos.findOne({userId: Router.current().params._id });
    let commentToVideo = {
      posterFullName: name,
      comment: comment
    };
    Videos.update({
      _id: prof._id},
      {$push: {comments : commentToVideo}}
    )
  },
});
