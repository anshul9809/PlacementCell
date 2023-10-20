const User = require("../models/user");
const Student = require("../models/student");
const Company = require("../models/company");

//company portal home page
module.exports.companyhome =async function(req,resp){

     try {
       if (!req.isAuthenticated()) {
         return resp.redirect("/users/login");
       }

      let studentlist = await Student.find({});

      req.flash("success", "COMPANY PORTAL OPEN");
      return resp.render("company",{studentlist});

     } catch (error) {
       console.log(`Error during submit the sigup form:  ${error}`);
       resp.redirect("back");
     }
}

//function to allocate the interview
module.exports.allocateInterview = async function(req,resp){

    try {
      if (!req.isAuthenticated()) {
        return resp.redirect("/users/login");
      }

      let students = await Student.find({});


      let batch = await Student.find({});
      batch_array=[];
      for(let st of batch){
        batch_array.push(st.batch);
      }
      batch_array = [...new Set(batch_array)];

      return resp.render("allocateInterview",{students,batch_array});

    } catch (error) {
      console.log(`Error during submit the sigup form:  ${error}`);
      resp.redirect("back");
    }
}

//function to schedule the interview
module.exports.scheduleInterview = async function(req,resp){

    try {
      if (!req.isAuthenticated()) {
        return resp.redirect("/users/login");
      }

      let compny = await Company.findOne({name:req.body.companyname});
      let studentid = req.body.studentname;

      if(!compny){

           let data = {
             student: req.body.studentname,
             date: req.body.companydate,
             result: "Pending",
           };

          let newlyaddedd=await Company.create({
            name: req.body.companyname,
          });
          newlyaddedd.students.push(data);
          newlyaddedd.save();
      }
      else
      {
          for(let std of compny.students)
          {
            if(std.student._id == studentid){
              req.flash("error", "STUDENT ALREADY INTERVIEW SCHEDULED");
              console.log("Already added");
              return resp.redirect("back");
            }
          }
           let data = {
             student: req.body.studentname,
             date: req.body.companydate,
             result: "Pending",
           };
           compny.students.push(data);
           compny.save();
      }

      let studnt = await Student.findById(studentid);

      if(studnt){
        let studentinterview = {
          companyname: req.body.companyname,
          scheduledate: req.body.companydate,
          result: "Pending",
        };
        studnt.interviews.push(studentinterview);
        studnt.save();
    }
    req.flash("success", "HURRAY INTERVIEW SCHEDULE");
    return resp.redirect('/company/')
    } catch (error) {
      console.log(`Error during submit the sigup form:  ${error}`);
      resp.redirect("back");
    }
}

//function for updating the records
module.exports.updateRecords = async function(req,resp){

  try {

    if (!req.isAuthenticated()) {
      return resp.redirect("/users/login");
    }
    let present=false;
    let studnt = await Student.findById(req.params.id);
    if(studnt){

      if(studnt.interviews.length > 0){

        for(let cmpy of studnt.interviews){
          if(cmpy.companyname == req.body.cname){
            cmpy.result = req.body.isStatus;
            studnt.save();
            present=true;
            break;
          }
        }

      }

      if(present){

        let compname = await Company.findOne({name:req.body.cname});

        if(compname){

          for (let stdid of compname.students) {
            if (stdid.student._id == req.params.id) {
              stdid.result = req.body.isStatus;
              compname.save();
            }
          }
        }
      }
    }
    req.flash("success", "STATUS CHANGED SUCCESSFULLY");
    return resp.redirect('back');
  } catch (error) {
    console.log(`Error during submitting the form:  ${error}`);
    resp.redirect("back");
  }

}