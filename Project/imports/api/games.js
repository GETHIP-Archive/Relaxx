export const Games = new Mongo.Collection('games');

Game_Comment_Schema = new SimpleSchema({
  posterFullName: {
    type: String
  },
  comment: {
    type: String,
    max: 140
  }
});

Games.schema = new SimpleSchema({
  gameLink:
  {
    type: String
  },
  gameName:
  {
    type: String
  },
  gamePic:
  {
    type: String,
    optional: true
    //defaultValue:
  },
  gamealltags:
  {
    type: [String],
    defaultValue: [],
    optional: true
  },
  gamecomments:
  {
    type: [Game_Comment_Schema],
    optional: true
  }
});

Games.attachSchema(Games.schema);
