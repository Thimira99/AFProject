const staffRegistration = require('../models/staff');



/*Post Staff registration */

const postStaffRegistration = async(req,res) => {
    let newStaff = new staffRegistration(req.body);

    newStaff.save((err)=>{
        if(err) {
            return res.status(400).json({Error:err});
        }

        return res.status(200).json({
            success: "Staff registerd successfully!",
            status: "200"
        });
    });
}

/*Get all register Staff */

const getAllStaff = async (req, res) => {
    try {
        const staffData = await staffRegistration.find()
        return res.status(200).send({
            status: "200",
            data: staffData
        })
    } catch (err) {
        return res.status(500).send({
            status: "500",
            err: err
        })
    }
}

/*Update staff */

const updateStaff = async (req, res) => {
    staffRegistration.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },

    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "user updated" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with updating data" });

    })
}

/*get one staff user */

const getOneStaffUser = async(req,res) => {

    try {

        const user = await staffRegistration.findById(req.params.id);
        return res.status(200).json({ data: user })

    } catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }

}

/*Delete Staff user */

const deleteStaffUser = async (req, res) => {

    staffRegistration.findByIdAndDelete(
        req.params.id
    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "user deleted" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with deleting data" });

    })

}



module.exports = {
    postStaffRegistration,
    getAllStaff,
    updateStaff,
    getOneStaffUser,
    deleteStaffUser
}