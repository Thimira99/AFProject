const submission = require('../models/submissions')


//get subs
// const getSubmission = async (req, res) => {
//     submission.find().exec((err, submissions) => {
//         if (err) {
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             existingSubmissions: submissions
//         });
//     });
// }

//get a specific sub by id
// const getASpecificSubmission=async(req,res)=>{
//     let submissionId = req.params.id;
//     submission.findById(submissionId,(err,submission)=>{
//         if(err){
//             return res.status(400).json({success:false,err});
//         }

//         return res.status(200).json({
//             success:true,
//             submission
//         });
//     });

// }

const fileUpload = async (req, res) => {
    try {
        const file = new submission({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });

        await file.save();
        res.status(201).send("File Uploaded")
    } catch (error) {
        res.status(400).send("File not Uploaded");
    }
}


const getfileUpload = async (req, res) => {
    try {
        const file = await submission.find();
        res.status(200).send(file);

    } catch (error) {
        res.status(400).send("File not got");
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 bytes'
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));

    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];
}

module.exports = {

    fileUpload,
    getfileUpload


}