var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')



var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine','handlebars');

//MORE IMPORTS HERE

app.set ('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res){
        res.render('start');
        
        });

app.get('/whoweare', function(req, res){
        res.render('whoweare');
        
        });
app.get('/ourcurriculum', function(req, res){
        res.render('ourcurriculum');
        
        });
app.get('/rethinkcommunities', function(req, res){
        res.render('rethinkcommunities');
        
        });

app.post('/contact', function contact(req, res) {
    
    if (!req.body) return res.sendStatus(400)
    var textfield = req.body.usrname + "\n\n\n" + req.body.email + "\n\n" + req.body.content ;
    var name = req.body.usrname;
    console.log(req.body);


    
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'terence.dew@gmail.com',
        pass: 'jozidgdulzlomkpr'
    }
});

console.log('created');

transporter.sendMail({
from: 'terencedew@kssteamacademy.com',
  to: 'terence.dew@gmail.com',
  subject: 'Interested:'+ name,
  text: textfield
});
    });
    
app.listen(app.get('port'),function(){
    console.log("Express started on http://localhost:" + app.get('port') + "Press Ctrl+C to terminate")
});

