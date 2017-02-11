export const Videos = new Mongo.Collection('videos');

Video_Comment_Schema = new SimpleSchema({
  posterFullName: {
    type: String
  },
  comment: {
    type: String,
    max: 140
  }
});

Videos.schema = new SimpleSchema({
  videoLink:
  {
    type: String
  },
  videoName:
  {
    type: String,
    optional: true
  },
  videoalltags:
  {
    type: [String],
    defaultValue: [],
    optional: true
  },
  videocomments:
  {
    type: [Video_Comment_Schema],
    optional: true
  }
});

Videos.attachSchema(Videos.schema);
