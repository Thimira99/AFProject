const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

studentSchema.method.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token;
}

const Student = mongoose.model("student", studentSchema);

const validate = (data) => {
    const schema = joi.object({
        studentName: joi.string().required().label("Student Name"),
        studentId: joi.string().required().label("Student ID"),
        email: joi.string().required().label("Student Email"),
        gender: joi.string().required().label("Gender"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

module.exports = { Student, validate };