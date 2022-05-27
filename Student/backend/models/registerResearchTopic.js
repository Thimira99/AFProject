const mongoose = require('mongoose');


const registerTopicSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    researchField: {
        type: String,
        required: true
    },
    researchTopic: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        required: true
    },
});


const registerTopic = mongoose.model("registeredTopic", registerTopicSchema);



module.exports = registerTopic;