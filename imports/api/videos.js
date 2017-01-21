export const Videos = new Mongo.Collection('videos');

Video_Comment_Schema = new SimpleSchema
({
  posterFullName: {
    type: String
  },
  comment: {
    type: String,
    max: 140
  }
});

Videos.schema = new SimpleSchema
({
  videoName:
  {
    type: String
  },
  bio:
  {
    type: String
  },
  comments:
  {
    type: [Video_Comment_Schema],
    optional: true
  }
});

Videos.attachSchema(Videos.schema);
