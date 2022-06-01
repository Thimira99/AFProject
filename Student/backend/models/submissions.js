const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true,
        trim: true
    },
    fileType: {
        type: String,
        required: true,
        trim: true
    },
    fileSize: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true });


const submission = mongoose.model("Submission", submissionSchema)
module.exports = submission