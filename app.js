var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = {
    "Fixed": "Fastened securely in position",
    "Movable": "Capable of being moved",
    "Rotating": "Moving in a circle around its center"
};

app.param('name', function(request, response, next) {
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  request.blockName = block;
  next();
})

app.get('/blocks', function(request, response) {
  response.json(Object.keys(blocks)); 
})

app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.blockName];
  if (!description) {
      response.status(404).json("No description found for " + request.params.name);
  }
  else {
      response.json(description);
  }

})

app.listen(3000);
