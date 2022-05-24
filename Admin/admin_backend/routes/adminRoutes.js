const express= require('express')
const router = express.Router()
const AdminLogin = require('../controller/adminController')
const { postSubmissions, getSubmission, getASpecificSubmission, updateSubmission, deleteSubmission } = require('../controller/submissionsController')

/*Login */
router.post("/login", AdminLogin)

/*Submission routes */
router.post("/submission/create",postSubmissions)
router.get("/submission/get",getSubmission)
router.get("/submission/get/:id",getASpecificSubmission)
router.put("/submission/update/:id",updateSubmission)
router.delete("/submission/delete/:id",deleteSubmission)

module.exports=router