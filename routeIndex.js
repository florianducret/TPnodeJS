/**
 * Created by Utilisateur on 23/11/2016.
 */
var express = require('express');

var cors = require('cors');

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: true}));
express.use(cors());

express.options('*', cors());

var router = express.Router();
var bd = require('gestionBDD');

router.get('/', function(req, res,next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

router.get('/annuaire', function(req, res,next) {
    //res.setHeader('Content-Type', 'text/plain');
    bd.getAllContact(function(err, data){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(data, null, 2));
    });
});


    router.post('/annuaire',function(req,res,next){
        bd.addContact(req.body.firstName, req.body.lastName, req.body.numTel, function(err, data){
        });
    });

    router.delete('/deleteAll',function(req,res,next){
        bd.deleteAll(function(err,data){
            if(err) return console.log.error(err);
            res.end('base de donnee reinitialisee');
        })
    });

    router.delete('/annuaire/:id',function(req,res,next){
        bd.deleteAll(req.params.id function(err,data){
            var status = data.result.n ? 204 : 404;
            res.status(status).send();
        });
    });

    router.put('/annuaire/:id',function(req,res,next){
        bd.updateContact(req.params.id, req.body.updatedfirstname,
        req.body.updatedlastname, req.body.updatedtelnumber, function(err, data){
                var status = err ? 404 : 204;
                res.status(status).send();
        });
});

    router.get('/annuaire/:id', function(req, res, next) {
        bd.getContactById(req.params.id, function(err, data){
            res.setHeader('Content-Type', 'application/json');
            if(data){
                res.status(200).send(JSON.stringify(result,null,2));
            }else{
                res.status(404).send();
            }
        });
    });

    router.post('/addData', (req,res)=>{
        func = function(err,data){};
        bd.addContact("Dark", "Vador","0569874523",func);
        bd.addContact("Luke","Skylwalker","0654387925" ,func);
        bd.addContact("Han", "Solo", "0158967835", func);
        bd.addContact("Ewok", "Ewok", "0000000000", func);
        bd.addContact("Chewee", "Chewbacca", "0547855547", func);
        res.status(201).send();
    });

//gestion des erreurs 404
router.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

module.exports = router;