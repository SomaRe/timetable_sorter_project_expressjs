const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex : true},(err)=>{
 if(!err)
    {
        console.log("connected")
    }
    else
    {
        console.log('not connected:'+err)
    }
 });

 require('./student.model');