export const Soundclouds = new Mongo.Collection('soundclouds');

Soundcloud_Comment_Schema = new SimpleSchema({
  posterFullName: {
    type: String
  },
  comment: {
    type: String,
    max: 140
  }
});

Soundclouds.schema = new SimpleSchema({
  soundcloudLink:
  {
    type: String
  },
  soundcloudName:
  {
    type: String,
    optional: true
  },
  soundcloudalltags:
  {
    type: [String],
    defaultValue: [],
    optional: true
  },
  soundcloudcomments:
  {
    type: [Soundcloud_Comment_Schema],
    optional: true
  }
});

Soundclouds.attachSchema(Soundclouds.schema);
