const User = require("../models/user");
const Student = require("../models/student");
const Company = require("../models/company");

//creating the student
module.exports.createreq = async function(req,res){

    try{

        if (!req.isAuthenticated()) {

           return res.redirect("/users/login");
        }
        let studnt=[{}];


        return res.render('createStudent',{studnt});


    }catch(error){
        console.log(`Error during submit the sigup form:  ${error}`);
        res.redirect("back");
    }
}

//creating the stduent in DB
module.exports.createStudent = async function(req,res){

    try {

      if (!req.isAuthenticated()) {
        return res.redirect("/users/login");
      }

      let IsStudent = await Student.findOne({email:req.body.studentemail});

      if(!IsStudent){

        const newStudent = await Student.create({
          name: req.body.studentname,
          collegename: req.body.studentclgname,
          clgplacemnt:req.body.plcemntstatus,
          mobilenumber: req.body.studentmobileno,
          email: req.body.studentemail,
          batch: req.body.studentbatch,
          dsascore: req.body.studentdsascore,
          webdevscore: req.body.studentwebscore,
          reactscore: req.body.studentreactscore,
        });

        await newStudent.save();

        if (!newStudent) {
          console.log("error in creating new student");
          return res.redirect("back");
        }
        req.flash("success", "Create Successfully");
        return res.redirect("/");

      }else{
        req.flash("error", "E-Mail ID Already present");
        return res.redirect("back");
      }
    } catch (error) {
      console.log(`Error during submit the sigup form:  ${error}`);
      res.redirect("back");
    }

}

//viewing the student details
module.exports.viewdata = async function(req,res){

     try {
       if (!req.isAuthenticated()) {
         return res.redirect("/users/login");
       }

       let studnt = await Student.findById(req.params.id);

       return res.render("viewstudent",{studnt});

     } catch (error) {
       console.log(`Error during submit the sigup form:  ${error}`);
       res.redirect("back");
     }

}

module.exports.updatereq = async function(req,res){

    try {

      if (!req.isAuthenticated()) {
        return res.redirect("/users/login");
      }

      let studnt = await Student.findById(req.params.id);

      return res.render("editStudent", { studnt });
    } catch (error) {
      console.log(`Error during submit the sigup form:  ${error}`);
      res.redirect("back");
    }
}

module.exports.updtedone = async function(req,res){

    try {
      if (!req.isAuthenticated()) {
        return res.redirect("/users/login");
      }

      let IsStudent = await Student.findOne({ email: req.body.studentemail });

      if (IsStudent) {
        await IsStudent.updateOne({
          name: req.body.studentname,
          collegename: req.body.studentclgname,
          clgplacemnt: req.body.plcemntstatus,
          mobilenumber: req.body.studentmobileno,
          batch: req.body.studentbatch,
          dsascore: req.body.studentdsascore,
          webdevscore: req.body.studentwebscore,
          reactscore: req.body.studentreactscore,
        });

        await IsStudent.save();

        req.flash("success", "Details Updated Successfully");
        return res.redirect("/");

      } else {
        return res.redirect("back");
      }
    } catch (error) {
      console.log(`Error during submit the sigup form:  ${error}`);
      res.redirect("back");
    }
}

// DELETE THE STUDENT
module.exports.deletedata = async function(req,res){

  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/users/login");
    }

    let studnt = await Student.findById(req.params.id);

    if(studnt){

        if (studnt) {
          if (studnt.interviews.length > 0) {
            for (let studentcompany of studnt.interviews) {
              let deletestdfrmcompny = await Company.findOne({
                name: studentcompany.companyname,
              });

              if (deletestdfrmcompny) {
                for (let i=0;i<deletestdfrmcompny.students.length;i++) {
                  if (deletestdfrmcompny.students[i].student._id == req.params.id) {
                      deletestdfrmcompny.students.splice(i, 1);
                      deletestdfrmcompny.save();
                      break;
                  }
                }
              }
            }
          }

          await Student.findByIdAndDelete(req.params.id);
        }
    }
    req.flash("success", "Deleted Successfully");
    return res.redirect('/');

  } catch (error) {
    console.log(`Error during submit the sigup form:  ${error}`);
    res.redirect("back");
  }


}