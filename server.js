var express = require('express');
var app = express();
var router = require('./assets/js/main')(app);

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express Server has started on port 3000");
});

app.use(express.static(__dirname+'/assets'));



