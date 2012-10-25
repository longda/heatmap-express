var mongoose = require('mongoose')
  , db = mongoose.connect('mongodb://heroku_app8712536:jpu9v6fttdfmhqsnuaptsa9fco@ds041337.mongolab.com:41337/heroku_app8712536');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  killed_user_id: { type: Number },
  killer_user_id: { type: Number },
  map_id: { type: Number},
  position: { type: [Number] },
  rotation: { type: [Number] },
  scale: { type: [Number] },
  state: { type: Number },
  killed_weapon_id: { type: Number },
  killer_weapon_id: { type: Number },
  server: { type: String },
  datacenter: { type: String },
  data: { type: String },
  utc_timestamp: { type: Date }
});

var Event = db.model('Event', eventSchema);

exports.findAllEvents = function(req, res){
  //res.json([{name:'event1'}, {name:'event2'}]);
  //res.json([new Event({name: 'Event 1'}), new Event({name: 'Event 2'})]);
  return Event.find(function(err, events){
    if (!err) {
      res.json(events);
    } else {
      return console.log(err);
    }
  });
};

exports.findByEventId = function(req, res){
  res.json({id:req.params.id, name: "The Name", description: "description"});
};

exports.populate = function(req, res){
  console.log('Populating event data...');

  for(var i = 0; i < 100; i++){
    var sample = new Event({
      killed_user_id: (Math.floor(Math.random() * 1000)),
      killer_user_id: (Math.floor(Math.random() * 1000)),
      map_id: (Math.floor(Math.random() * 17)),
      position: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100),Math.floor(Math.random() * 100)],
      rotation: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100),Math.floor(Math.random() * 100)],
      scale: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100),Math.floor(Math.random() * 100)],
      state: (Math.floor(Math.random() * 33)),
      killed_weapon_id: (Math.floor(Math.random() * 33)),
      killer_weapon_id: (Math.floor(Math.random() * 33)),
      server: 'server-1',
      datacenter: 'datacenter-1',
      utc_timestamp: Date.now()
    });

    console.log("GENERATED:");
    console.log(sample);

    sample.save(function(err){
      if (err) console.log(err);
    });
  }

  console.log('FINISHED.');
  res.json({success: 'true'});
};