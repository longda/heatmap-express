
/*
 * GET events api.
 */

exports.findAllEvents = function(req, res){
  res.json([{name:'event1'}, {name:'event2'}]);
};

exports.findByEventId = function(req, res){
  res.json({id:req.params.id, name: "The Name", description: "description"});
};