const Student = require("../models/student");
const fs = require('fs');

//download the file
module.exports.downloadfile = async function(req,resp){

    try{

        if (!req.isAuthenticated()) {

           return resp.redirect("/users/login");
        }

        let totalStudents = await Student.find({});
        data="";
        let row=1;

        let csvdata ="S.No, Name, Email,Collegename,Clgplacemnt,Mobilenumber,Batch, DSAScore, WebDevScore, ReactScore, Interview, Date, Result";

        for(let student of totalStudents){

            data =
              row +
              "," +
              student.name +
              "," +
              student.email +
              "," +
              student.collegename +
              "," +
              student.clgplacemnt +
              "," +
              student.mobilenumber +
              "," +
              student.batch +
              "," +
              student.dsascore +
              "," +
              student.webdevscore +
              "," +
              student.reactscore;

              if(student.interviews.length > 0){

                for (let interview of student.interviews) {
                  data +=
                    "," +
                    interview.companyname +
                    "," +
                    interview.scheduledate.toString() +
                    "," +
                    interview.result;
                }

              }

              row++;
            csvdata += "\n" + data;
        }

        const file = fs.writeFile(
          "Reports/Studentdata.csv",
          csvdata,
          function (err, data) {
            if (err) {
              console.log(err);
              return resp.redirect("back");
            }
            req.flash("success", "DATA HAS BEEN DOWNLAODED");
            return resp.download("Reports/Studentdata.csv");
          }
        );

    }catch(error){
        console.log(`Error during submit the sigup form:  ${error}`);
        resp.redirect("back");
    }

}