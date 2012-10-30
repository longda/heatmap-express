# Heatmap Express
A coding sample... In order to gain visibility into how our players are experiencing our game, we want to collect data about each player death. This event would include such values as their location and how they died.
 
The ultimate goal of this system would be to generate a heat map overlaid on top of a game map to indicate common death locations.
 
1. Design a system such that:

  (A) Data collection can occur frequently (1+ deaths per minute, per player).  Assume that events will be generated by hundreds to thousands of game servers, across multiple data centers.
 
  (B) Data storage allows for flexible heat map generation, such as filters based on event data, real-time maps, etc.
 
2. Build a prototype in the language of your choice that exemplifies the core of your design and that can generate an accurate heat map from sample data – which you can provide.
 
Please document how much time you spend completing this task, as well as any notes you feel are relevant. Also be prepared to defend your choices in terms of scalability, extensibility, and maintainability.

## Installation and Setup
1. Install [Node with NPM](http://nodejs.org/)
2. Download code from github
3. cd into the heatmap-express directory: ``` $ cd heatmap-express ```
4. Install all the packages: ``` $ npm install ```
5. *(Optional)* Change the mongo db connection string in /routes/api.js to point to your instance of mongo db
6. Run the app using node: ``` $ node app.js ``` or heroku: ``` $ foreman start ```

## Design Explanation
This sample pertains primarily to the storage system for events generated from some game, storage and retrieval via calls
into a REST API, and one sample display in a web application. At this time, no considerations have been made as to
security regarding the calls into the API.

### Data Model
The data model used for this app is a simple and flexible using the equivalent of foreign key ids from a relational model
for common objects such as users (killer/killed), maps, weapons, etc.  These could be references into a relational system
or embedded documents of a NO SQL system such as Mongo.  Since these would be extremely redundant if embedded into 
thousands of records, I've chosen to just use foreign keys for now.  It is assumed that a reference of map id 1 would be
resolved trivially via a master map list or a GetMapById() call.

### Data Storage
Primary storage for this system is Mongo DB via MongoLab, a SAAS provider for Mongo storage.  Using a SAAS solution, one
has the ability to scale up the service as required and limit the amount of overhead required for system administration.
The GetDataByMapId() call uses a Map Reduce function to aggregate kill data by coordinate.  Additional filters could be
used to get different events, specify a weapon, etc.  Mongo as a data store is ideal because it is quick to right to, the
data is really not relational per se, and as changes to this data are required, we do not need to go back and change a 
schema on a "table" of millions of rows of data as would be required with RDMSes.

### REST API
Basic REST calls are available via the HTTP verbs POST, PUT, DELETE, and GET.  Additionally, a populate method is
included to create a number of test events to use as data on heatmaps and test the system.  The actual heatmap app uses
a GetDataByMapId() call to retrieve formatted data that the heatmap.js library can use.  Node and Express provide an easy
way to setup and create REST services as well serve web documents/assets. Since we're using a simple
REST API, a logical addition here would be to add caching via a http cache such as Squid (between clients and the service)
or data caching tier (between the service and the data store).

### Presentation
Presentation relies on the core of Node and Express coupled with Jade templating and Stylus for CSS styling.  For the
mapping library, I've used Heatmap.js which simplifies the display of heatmap data based on inputted JSON data and HTML5
canvas.  The map image used is borrowed from Call of Duty Elite and is meant simply as a visual placeholder.  Twitter
bootstrap is included but was not used due to time constraints.  This library provides a simple, consistent UI that is
tasteful and easy for developers to leverage.

### Tradeoffs
I chose a quickly bootstrapped system to be used as this proof of concept.  Most, if not all, of the technologies could
be easily swapped out in preference of something else.  However, due to the asynchronous nature of Node, this system 
should be able to scale fairly well by creating a cluster of instances (scaling out) or increasing the number of dynos
running underneath on Heroku (scaling up).  The same could be said for the data store since Mongo can be clustered or
scaled up via a SAAS provider such as MongoLab.

### Extension Points
* Caching, both between the client and the services as well as between the services and the data store
* More filtering of data for various maps, weapons, times of day, etc
* Further aggregation of data via offline processes that run periodically to compact data into required forms
* Scale the solution up via SAAS providers such as Heroku and MongoLab
* Instrument and performance test the system and its components with a tool such as New Relic

## Time Logged
* Tuesday, Oct. 23rd - 30 mins of research into heat map libraries mostly + a bit of logistics around Node based solution
* Wednesday, Oct. 24th - 6 hours of setup of infrastructure for server, api, routing, data store, heat map libraries
* Thursday, Oct. 26th - 3 hours finalizing data structure for storage and heat map library integration, finishing rest api verb buildout
* Monday, Oct. 29th - 1 hour of writeup
* Tuesday, Oct. 30th - 1 hour of writeup 

## Technologies Used

* [Node.js](http://www.nodejs.org/)
* [Express.js](http://expressjs.com/)
* [Heatmap.js](http://www.patrick-wied.at/static/heatmapjs/)
* [Jquery](http://jquery.com/)
* [Jade](http://jade-lang.com/)
* [Stylus](http://learnboost.github.com/stylus/)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
* [Mongo DB](http://www.mongodb.org/)
* [Mongoose](http://mongoosejs.com/)
* [Heroku](http://www.heroku.com/)
* [MongoLab](https://mongolab.com)