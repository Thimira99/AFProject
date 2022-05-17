const router = require("express").Router();
const { Student, validate } = require("../models/student");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const student = await Student.findOne({ email: req.body.email });
        if (student) {
            return res.status(200).send({ message: "User exist" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Student({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "Student Created" })
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }

})


module.exports = router;