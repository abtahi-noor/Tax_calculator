const mongoose = require('mongoose')

const admin_messages_schema = new mongoose.Schema({
        userEmail: String,
        adminName: String,
        topic: String,
        message: String,  
    }, {
        collection: 'admin_messages' // preventing auto add 's' in mongodb table 
    }
)

const admin_messages_model = mongoose.model("admin_messages", admin_messages_schema)
module.exports = admin_messages_model