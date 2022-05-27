const express= require('express')
const router = express.Router()
const AdminLogin = require('../controller/adminController')


const { getRoles, createPanel, getPanels, updatePanel, getASpecificPanel, deletePanel, getASpecificRole, updateRole, deleteRole } = require('../controller/panelController')

const { postSubmissions, getSubmission, getASpecificSubmission, updateSubmission, deleteSubmission, postResearchTopics, getTopics, updateTopics, deleteTopic, getASpecificTopic } = require('../controller/submissionsController')


const { postMarkings, getMarking, getAMarking, updateMarking, deleteMarking } = require('../controller/markingsController')


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
router.get("/role/get/:id",getASpecificRole)
router.put("/role/update/:id",updateRole)
router.delete("/role/delete/:id",deleteRole)


/*panel routes */
router.post("/panels/create",createPanel)
router.get("/panels/get",getPanels)
router.put("/panel/update/:id",updatePanel)
router.get("/panel/get/:id",getASpecificPanel)
router.delete("/panel/delete/:id",deletePanel)

/*Research topics*/
router.post("/topics/create",postResearchTopics)
router.get("/topics/get",getTopics)
router.put("/topics/update/:id",updateTopics)
router.delete("/topics/delete/:id",deleteTopic)
router.get("/topics/get/:id",getASpecificTopic)

/*Marking Scheme routes */
router.post("/marking/create",postMarkings)
router.get("/marking/get",getMarking)
router.get("/marking/get/:id",getAMarking)
router.put("/marking/update/:id",updateMarking)
router.delete("/marking/delete/:id",deleteMarking)


module.exports=router