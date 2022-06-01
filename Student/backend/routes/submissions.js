'use strict';

const express = require('express')
const postSubmission = require('../Controller/addSubmissions')
const { fileUpload, getfileUpload } = require('../Controller/submissions')
const { upload } = require("../helpers/fileHelper");
const router = express.Router()

router.get("/submissions/get", getfileUpload)

router.post("/submissions/add", upload.single('file'), fileUpload);


module.exports = router