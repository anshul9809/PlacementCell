const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    collegename:{
        type :String ,
        required:true
    },
    clgplacemnt:{
        type: String,
        required: true,
      },
    
    mobilenumber:{
        type: String,
        required:true
    },
    email:{
        type: String,
        uniqe: true,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    dsascore:{
        type: String,
        required: true
    },
    webdevscore:{
        type: String,
        required: true
    },
    reactscore:{
        type: String,
        required: true
    },
    interviews:[
        {
            companyname:{
                type:String,
            },
            scheduledate:{
                type:String,
            },
            result:{
                type:String,
                enum:[
                    "Selected",
                    "Not Selected",
                    "On Hold",
                    "Pending"
                ],
            }
        }
    ]
},{
    timestamps: true
});

const Student = mongoose.model('Student', StudentSchema);

module.exports=Student;