const express= require('express')
const router = express.Router()
const AdminLogin = require('../controller/adminController')
const { getRoles, createPanel, getPanels } = require('../controller/panelController')
const { postSubmissions, getSubmission, getASpecificSubmission, updateSubmission, deleteSubmission, postResearchTopics, getTopics, updateTopics, deleteTopic, getASpecificTopic } = require('../controller/submissionsController')

/*Login */
router.post("/login", AdminLogin)

/*Submission routes */
router.post("/submission/create",postSubmissions)
router.get("/submission/get",getSubmission)
router.get("/submission/get/:id",getASpecificSubmission)
router.put("/submission/update/:id",updateSubmission)
router.delete("/submission/delete/:id",deleteSubmission)

/* role routes */
router.get("/roles/get",getRoles)

/*panel routes */
router.post("/panels/create",createPanel)
router.get("/panels/get",getPanels)

/*Research topics*/
router.post("/topics/create",postResearchTopics)
router.get("/topics/get",getTopics)
router.put("/topics/update/:id",updateTopics)
router.delete("/topics/delete/:id",deleteTopic)
router.get("/topics/get/:id",getASpecificTopic)

module.exports=router