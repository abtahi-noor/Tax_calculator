const mongoose = require('mongoose')

const admin_creds_schema = new mongoose.Schema({
        adminID: String,
        password: String,
    }, {
        collection: 'admin_creds'
    }
)

const admin_creds_model = mongoose.model("admin_creds", admin_creds_schema)
module.exports = admin_creds_model