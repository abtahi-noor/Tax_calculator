const mongoose = require('mongoose')

const login_info_users_schema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,  
        role: { type: String, default: "Normal" }  
    }, {
        collection: 'login_info_users' // preventing auto add 's' in mongodb table 
    }
)

const login_info_users_model = mongoose.model("login_info_users", login_info_users_schema)
module.exports = login_info_users_model