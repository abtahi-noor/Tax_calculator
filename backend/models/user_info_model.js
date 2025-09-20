const mongoose = require('mongoose')

const user_info_schema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        sex: String,
        nid_number: String,
        profession: String,
        dob: Date,
    }, {
        collection: 'user_informations'
    }
)

const user_info_model = mongoose.model("user_informations", user_info_schema)
module.exports = user_info_model