const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const student=mongoose.model('student');

//const skeleton = ["Theory","Start","08:00","09:00","10:00","11:00","12:00","-","Lunch","14:00","15:00","16:00","17:00","18:00","18:50","19:01","End","08:50","09:50","10:50","11:50","12:50","-","Lunch","14:50","15:50","16:50","17:50","18:50","19:00","19:50","Lab","Start","08:00","08:46","10:00","10:46","11:31","12:16","Lunch","14:00","14:46","16:00","16:46","17:31","18:16","-","End","08:45","09:30","10:45","11:30","12:15","13:00","Lunch","14:45","15:30","16:45","17:30","18:15","19:00","-","MON","Theory","A1","F1","D1","TB1","TG1","-","Lunch","A2","F2","D2","TB2","TG2","-","V3","Lab","L1","L2","L3","L4","L5","L6","Lunch","L31","L32","L33","L34","L35","L36","-","TUE","Theory","B1","G1","E1","TC1","TAA1","-","Lunch","B2","G2","E2","TC2","TAA2","-","V4","Lab","L7","L8","L9","L10","L11","L12","Lunch","L37","L38","L39","L40","L41","L42","-","WED","Theory","C1","A1","F1","V1","V2","-","Lunch","C2","A2","F2","TD2","TBB2","-","V5","Lab","L13","L14","L15","L16","L17","L18","Lunch","L43","L44","L45","L46","L47","L48","-","THU","Theory","D1","B1","G1","TE1","TCC1","-","Lunch","D2","B2","G2","TE2","TCC2","-","V6","Lab","L19","L20","L21","L22","L23","L24","Lunch","L49","L50","L51","L52","L53","L54","-","FRI","Theory","E1","C1","TA1","TF1","TD1","-","Lunch","E2","C2","TA2","TF2","TDD2","-","V7","Lab","L25","L26","L27","L28","L29","L30","Lunch","L55","L56","L57","L58","L59","L60","-","SAT","Theory","V8","X11","X12","Y11","Y12","-","Lunch","X21","Z21","Y21","W21","W22","-","V9","Lab","L71","L72","L73","L74","L75","L76","Lunch","L77","L78","L79","L80","L81","L82","-","SUN","Theory","V10","Y11","Y12","X11","X12","-","Lunch","Y21","Z21","X21","W21","W22","-","V11","Lab","L83","L84","L85","L86","L87","L88","Lunch","L89","L90","L91","L92","L93","L94","-"]

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
    tt_arr = tt_arr.filter(Boolean);
    Student.name=req.body.name;
    Student.id=req.body.id;
    Student.timetable=tt_arr;
    monday=[];
    tuesday=[];
    wednesday=[];
    thursday=[];
    friday=[];
    mon_th = tt_arr.slice(64,78);mon_lab = tt_arr.slice(79,93);
    tues_th = tt_arr.slice(95,109);tues_lab = tt_arr.slice(110,124);
    wed_th = tt_arr.slice(126,140);wed_lab = tt_arr.slice(141,155);
    thur_th = tt_arr.slice(157,171);thur_lab = tt_arr.slice(172,186);
    fri_th = tt_arr.slice(188,202);fri_lab = tt_arr.slice(203,217);
    for (var i = 0; i < 14; i++) {
        if ((mon_th[i]).length > (mon_lab[i]).length && (mon_th[i]).length > 5) {
            monday.push(mon_th[i])
        }
        else if ((mon_th[i]).length < (mon_lab[i]).length && (mon_lab[i]).length > 5) {
            monday.push(mon_lab[i])
        }
        else if(mon_th[i].length!=5 && mon_lab[i].length!=5){
            monday.push("free")
        }

        if ((tues_th[i]).length > (tues_lab[i]).length && (tues_th[i]).length > 5) {
            tuesday.push(tues_th[i])
        }
        else if ((tues_th[i]).length <(tues_lab[i]).length && (tues_lab[i]).length > 5) {
            tuesday.push(tues_lab[i])
        }
        else if((tues_th[i]).length!=5 && (tues_lab[i]).length!= 5){
            tuesday.push("free")
        }
        if ((wed_th[i]).length > (wed_lab[i]).length && (wed_th[i]).length > 5) {
            wednesday.push(wed_th[i])
        }
        else if ((wed_th[i]).length < (wed_lab[i]).length && (wed_lab[i]).length > 5) {
            wednesday.push(wed_lab[i])
        }
        else if((wed_th[i]).length!=5 && (wed_lab[i]).length != 5){
            wednesday.push("free")
        }
        if ((thur_th[i]).length > (thur_lab[i]).length && (thur_th[i]).length > 5) {
            thursday.push(thur_th[i])
        }
        else if ((thur_th[i]).length < (thur_lab[i]).length && (thur_lab[i]).length > 5) {
            thursday.push(thur_lab[i])
        }
        else if((thur_th[i]).length!=5 && (thur_lab[i]).length!=5){
            thursday.push("free")
        }
        if ((fri_th[i]).length > (fri_lab[i]).length && (fri_th[i]).length > 5) {
            friday.push(fri_th[i])
        }
        else if ((fri_th[i]).length < (fri_lab[i]).length && (fri_lab[i]).length > 5) {
            friday.push(fri_lab[i])
        }
        else if((fri_th[i]).length!=5 && (fri_lab[i]).length!=5){
            friday.push("free")
        }
    }
    Student.timetable_sorted.monday = monday
    Student.timetable_sorted.tuesday = tuesday
    Student.timetable_sorted.wednesday = wednesday
    Student.timetable_sorted.thursday = thursday
    Student.timetable_sorted.friday = friday

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
            res.redirect('/');
        }
        else
        {
            console.log('error in student delete:'+err);
        }
    });
});

router.get('/generate_slots',(req,res)=>{
    student.find((err,docs)=>{
        if(!err){
            res.render("student/generate_slots",{
                list: docs
            });
        }
        else
        {
            console.groupCollapsed('error:'+err);
        }
    }).lean();
});

module.exports=router;