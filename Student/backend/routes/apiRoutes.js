const express = require('express');
const router = express.Router();


const { postMesage , getMsgfillter , getbyDatebySennder ,updateStats } = require('../Controller/messsage')
const { postMainStaffRegistration , mainStaffLogin } = require('../Controller/mainStaff')
const { postStaffRegistration , getAllStaff ,updateStaff , getOneStaffUser , deleteStaffUser , StaffLogin} = require('../Controller/staffController')
const { getHistoryMsgByName , postHistoryMesage , getHistoryMsgBySennder} = require('../Controller/msgHistoryController')



/*Main Staff registration */
router.post("/mainstaffRegister/post",postMainStaffRegistration);
router.post("/mainstaffRegister/login",mainStaffLogin);


/*Staff registration */

router.post("/staffRegister/post",postStaffRegistration);
router.get("/staffRegister/get",getAllStaff);
router.put("/staffRegister/update/:id",updateStaff);
router.get("/staffRegister/get/:id",getOneStaffUser);
router.delete("/staffRegister/delete/:id",deleteStaffUser);
router.post("/staffRegister/login",StaffLogin);


/* Message */
router.post("/message/post",postMesage);
router.post("/message/get",getMsgfillter);
router.post("/message/get/sennder",getbyDatebySennder);
router.put("/message/update/:id",updateStats);

router.post("/msgHistory/post",postHistoryMesage);
router.post("/msgHistory/get",getHistoryMsgByName);
router.post("/msgHistory/getbySennder",getHistoryMsgBySennder);




module.exports = router;