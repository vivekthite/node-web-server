const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

//handlebars stuff
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('upperCase',(text) => {
    return text.toUpperCase();
});
app.set('view engine',hbs);

//middleware stuff
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = now + ' ' + req.method + ' '+req.url;
    console.log(log);
    fs.appendFile('server.log',log+'\n', (err) => {
        if(err){
            console.log('Error while appending log to file');
        }        
    });
    next();
});

/* app.use((req,res,next) => {
    res.render('maintanance.hbs');
}); */

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle : 'This is home page',        
        welcomeMessage : 'Welocme Message goes here' 
    });
});


app.get('/json',(req,res) => {
    res.send({
        name: 'Ram',
        likes: [
            'Cricket',
            'Football'
        ]
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
      pageTitle : 'This is about page'  
    });
});


app.get('/bad',(req,res) => {
    res.send({
        status: 'Unable to fullfill request'
    });
});

app.listen(3000,() => {
    console.log('Server is up at 3000 port');
});

console.log('Starting Server ...');

