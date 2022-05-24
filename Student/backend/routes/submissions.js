const express= require('express')
const postSubmission = require('../Controller/addSubmissions')
const { getSubmission, getASpecificSubmission} = require('../Controller/submissions')
const router = express.Router()


router.get("/student/submissions",getSubmission)
router.get("/student/submissions/:id",getASpecificSubmission)

router.post("/student/submissions/add",postSubmission)


module.exports=router