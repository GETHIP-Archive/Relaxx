Template.video.events({
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
    )}
})
