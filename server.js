require('./model/db');

const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars'); 
const bodyparser=require('body-parser');


const studentController=require('./controllers/studentController')

var app=express();

app.use("/static",express.static(__dirname+'/public'));

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({
    extname:'hbs',
    defaultLayout : 'mainLayout',
    layoutDir:__dirname+'/views/layouts/'
}));
app.set('view engine','hbs');


app.listen(3000,()=>{

    console.log('express started at :3000');
});

app.use('/student',studentController);