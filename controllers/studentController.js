const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const student=mongoose.model('student');

router.get('/',(req,res)=>{
    student.find((err,docs)=>{
        if(!err){
            res.render("student/addOrEdit",{
                list: docs
            });
        }
        else
        {
            console.groupCollapsed('error:'+err);
        }
    }).lean();
});

router.post('/',(req,res)=>{
  insertRecord(req,res);
});

function insertRecord(req,res){
    var Student=new student();
    var tt = req.body.timetable;
    var tt_arr = tt.split(/\s/);
    tt_arr = tt_arr.filter(x => x);
    Student.name=req.body.name;
    Student.id=req.body.id;
    Student.timetable=tt_arr;
    Student.save((err,doc)=>{
        if(!err)
        {
            student.find((err,docs)=>{
                if(!err){
                    res.render("student/addOrEdit",{
                        list: docs
                    });
                }
                else
                {
                    console.groupCollapsed('error:'+err);
                }
            }).lean();
        }
        else{
            if(err.name == "ValidationError"){
                handleValidationError(err,req.body);
                student.find((err,docs)=>{
                res.render("student/addOrEdit",{
                    Student: req.body,
                    list:docs
                });
            }).lean();
            }
            console.log('error:'+err);
        }
    });
}


function handleValidationError(err,body){
    for (field in err.errors)
    {
        
        switch(err.errors[field].path){
            case 'name':
                body['Nameerror'] = err.errors[field].message;
                break;
            case 'id':
                body['iderror'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/delete/:id',(req,res)=>{
    student.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('/student');
        }
        else
        {
            console.log('error in student delete:'+err);
        }
    });
});

module.exports=router;