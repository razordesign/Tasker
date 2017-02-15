var mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://test:test@ds111589.mlab.com:11589/todosrazor');
module.exports = mongoose;