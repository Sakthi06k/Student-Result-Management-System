//importing student model
const Student = require('../models/student');

const student_login_get = (req, res) => {
       res.render("student/login");
    };

const student_login_post = async (req, res) => {

        const Sturoll = req.body.roll;   
        // const Studob=req.body.dob;
        const individualStudent = await Student.findOne({roll : Sturoll});
        const dt = individualStudent.dob.getDate().toString().padStart(2, '0');
        const studob=individualStudent.dob.getFullYear()+"-"+parseInt(individualStudent.dob.getMonth()+1)+"-"+dt;
        var arr=req.body.dob.split("-");
        var dob=arr[0]+"-"+parseInt(arr[1])+"-"+arr[2];
        // console.log(dob);
        // console.log(studob);
        // console.log(studob==dob);  
        if(individualStudent.roll!=req.body.roll || studob!=dob){
          res.render("student/login", {
            error : "Login with correct roll number"
          })
        }else{
          res.render("student/view", { one : individualStudent,studob});
        }      
        
    };

//exporting student controller functions
module.exports={
    student_login_get,
    student_login_post
}