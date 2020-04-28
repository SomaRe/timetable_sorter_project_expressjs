const mongoose=require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

var studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "field Required"
    },
    id:{
        type:String,
        required: "field Required",
        unique: true
    },
    timetable: {
        type : [String]
    }
    
});


studentSchema.plugin(uniqueValidator,{
    message: "duplicate Entry!"
});


studentSchema.path('id').validate((val)=>{
    idRegex = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}/;
        return idRegex.test(val);
}, "Invalid Id");

mongoose.model('student',studentSchema);