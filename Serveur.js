/**
 * Created by Utilisateur on 23/11/2016.
 */

var express = require('express');
var route = require('routeIndex');

var app = express();
app.use('/', route);

app.listen(8080, function(){
    console.log("http://localhost:8080/annuaire/")
});