/**
 * Created by Utilisateur on 30/11/2016.
 */

var mongoose = require('mongoose');
var express = require('express');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
//        unique: true,
        required: true
    },
    lastName: {
        type: String,
//        unique: true,
        required: true
    },
    telNumber: {
        type: String,
        required: true
    }
});

var contactModel = mongoose.model('ContactModel', userSchema);

module.exports.getAllContact = function(callback){
    contactModel.find(callback);
}

module.exports.deleteAll = function(callback){
    contactModel.remove(callback);
}

module.exports.getContactById = function(id, callback){
    contactModel.find({_id : id}, callback);
}

module.exports.addContact = function (firstName, lastName, telNumber, callback){
    var contact = new contactModel({
        "firstName" : firstName,
        "lastName" : lastName,
        "telNumber" : telNumber
    })
    contact.save(callback);
}

module.exports.deleteContact = function (id, callback){
    contactModel.remove({_id : id}, callback);
}

module.exports.updateContact = function(id, updatedFirstName, updatedLastName, updatedTelNumber, callback){
    var query = {"_id": id};
    var update = {"firstName" : updatedFirstName,
                  "lastName" : updatedLastName,
                  "telNumber" : updatedTelNumber
                  };
    contactModel.findOneAndUpdate(query,update,{upsert: true}, callback);
}

var connect = function(){
    var options = { server: {socketOptions : {keepAlive: 1}}};
    mongoose.connect('mongodb://localhost/annuaire');
};

var db = mongoose.connection;

db.once('open', function(){
    console.log("connexion etablie");
})

connect();
module.exports.contactModel = contactModel;