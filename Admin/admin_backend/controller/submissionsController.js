const submission = require('../models/submissions')

/*create submissions*/
const postSubmissions = async(req,res)=>{
    let newSubmission = new submission(req.body);

    newSubmission.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Submission successfully added to the system!"
        });
    });

}

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

//update sub details
const updateSubmission = async(req,res)=>{
    submission.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Submission details updated successfully!"
            });
        }
    )
}

//delete subs from the system
const deleteSubmission = async(req,res)=>{
    submission.findByIdAndRemove(req.params.id).exec((err,deletedSubmission)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Submission something is wrong!",deletedSubmission
            });
        }
        return res.status(200).json({
            success:"Submission removed successfully!",deletedSubmission
        });
    });
};

module.exports = {
    postSubmissions,
    getSubmission,
    getASpecificSubmission,
    updateSubmission,
    deleteSubmission
}