const mongoose = require('mongoose')

const sec_key_schema = new mongoose.Schema({
        email: String,
        key: String
    }, {
        collection: 'sec_keys' // preventing auto add 's' in mongodb table 
    }
)

const sec_keys_model = mongoose.model("sec_keys", sec_key_schema)
module.exports = sec_keys_model 
