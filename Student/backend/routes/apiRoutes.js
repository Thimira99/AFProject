const express = require('express');
const router = express.Router();


const { postMesage, getMsgfillter, getbyDatebySennder, updateStats } = require('../Controller/messsage')
const { postMainStaffRegistration, mainStaffLogin } = require('../Controller/mainStaff')
const { postStaffRegistration, getAllStaff, updateStaff, getOneStaffUser, deleteStaffUser, StaffLogin, getAllSupervisors } = require('../Controller/staffController')



/*Main Staff registration */
router.post("/mainstaffRegister/post", postMainStaffRegistration);
router.post("/mainstaffRegister/login", mainStaffLogin);


/*Staff registration */

router.post("/staffRegister/post", postStaffRegistration);
router.get("/staffRegister/get", getAllStaff);
router.put("/staffRegister/update/:id", updateStaff);
router.get("/staffRegister/get/:id", getOneStaffUser);
router.delete("/staffRegister/delete/:id", deleteStaffUser);
router.post("/staffRegister/login", StaffLogin);
router.get("/staffRegister/supervisor", getAllSupervisors);


/* Message */
router.post("/message/post", postMesage);
router.post("/message/get", getMsgfillter);
router.post("/message/get/sennder", getbyDatebySennder);
router.put("/message/update/:id", updateStats);




module.exports = router;