export const Musics = new Mongo.Collection('musics');

Music_Comment_Schema = new SimpleSchema({
  posterFullName: {
    type: String
  },
  comment: {
    type: String,
    max: 140
  }
});

Musics.schema = new SimpleSchema({
  musicLink:
  {
    type: String
  },
  musicName:
  {
    type: String,
    optional: true
  },
  musicalltags:
  {
    type: [String],
    defaultValue: [],
    optional: true
  },
  musiccomments:
  {
    type: [Music_Comment_Schema],
    optional: true
  }
});

Musics.attachSchema(Musics.schema);
