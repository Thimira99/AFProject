const express = require('express');
const router = express.Router();


const { postStaffRegistration, getAllStaff, updateStaff, getOneStaffUser, deleteStaffUser, StaffLogin, getAllSupervisors , getStaffDetails } = require('../Controller/staffController')


const { postMesage , getMsgfillter , getbyDatebySennder ,updateStats , getUsersBySeenStatus } = require('../Controller/messsage')
const { postMainStaffRegistration , mainStaffLogin } = require('../Controller/mainStaff')
// const { postStaffRegistration , getAllStaff ,updateStaff , getOneStaffUser , deleteStaffUser , StaffLogin} = require('../Controller/staffController')
const { getHistoryMsgByName , postHistoryMesage , getHistoryMsgBySennder} = require('../Controller/msgHistoryController')
const { getStudentDetails} = require('../Controller/studentMsgController')
const { postTypnigMesage , getTypingStatus , updateByTypnigMsg , getAllobjects} = require('../Controller/MessageTypngConroller')
const { getOnereserchbySupervisors , getOnereserchbySupervisorsPending} = require('../Controller/reserchTopicsController')



/*Main Staff registration */
router.post("/mainstaffRegister/post", postMainStaffRegistration);
router.post("/mainstaffRegister/login", mainStaffLogin);


/*Staff registration */

router.post("/staffRegister/post", postStaffRegistration);
router.get("/staffRegister/get", getAllStaff);
router.put("/staffRegister/update/:id", updateStaff);
router.post("/staffRegister/getuser", getOneStaffUser);
router.delete("/staffRegister/delete/:id", deleteStaffUser);
router.post("/staffRegister/login", StaffLogin);
router.get("/staffRegister/supervisor", getAllSupervisors);
router.post("/msgHistory/getStaff", getStaffDetails);


/* Message */
router.post("/message/post", postMesage);
router.post("/message/get", getMsgfillter);
router.post("/message/get/sennder", getbyDatebySennder);
router.put("/message/update/:id", updateStats);

router.post("/msgHistory/post",postHistoryMesage);
router.post("/msgHistory/get",getHistoryMsgByName);
router.post("/msgHistory/getbySennder",getHistoryMsgBySennder);
router.post("/msgHistory/getStudent",getStudentDetails);
router.post("/msgHistory/getUsersBySeen",getUsersBySeenStatus);


/* Message typnig */

router.post("/msgTyping/post",postTypnigMesage);
router.post("/msgTyping/get",getTypingStatus);
router.post("/msgTyping/update",updateByTypnigMsg);
router.get("/msgTyping/",getAllobjects);


/* reserch topics */
router.post("/reserchTpoic/getbySup",getOnereserchbySupervisors);
// router.post("/reserchTpoic/getbySup/name",getOnereserchbySupervisorsPending);


module.exports = router;