const express = require('express');
const router = express.Router();

const { postMainStaffRegistration , mainStaffLogin } = require('../Controller/mainStaff')
const { postStaffRegistration , getAllStaff ,updateStaff , getOneStaffUser , deleteStaffUser} = require('../Controller/staffController')



/*Main Staff registration */
router.post("/mainstaffRegister/post",postMainStaffRegistration);
router.post("/mainstaffRegister/login",mainStaffLogin);


/*Staff registration */

router.post("/staffRegister/post",postStaffRegistration);
router.get("/staffRegister/get",getAllStaff);
router.put("/staffRegister/update/:id",updateStaff);
router.get("/staffRegister/get/:id",getOneStaffUser);
router.delete("/staffRegister/delete/:id",deleteStaffUser);


module.exports = router;