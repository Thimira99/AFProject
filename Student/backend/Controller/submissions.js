const submission = require('../models/submissions')


//get subs
const getSubmission =  async(req,res)=>{
    submission.find().exec((err,submissions)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingSubmissions:submissions
        });
    });
}

//get a specific sub by id
const getASpecificSubmission=async(req,res)=>{
    let submissionId = req.params.id;
    submission.findById(submissionId,(err,submission)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            submission
        });
    });

}

module.exports = {
    getSubmission,
    getASpecificSubmission,
    
}