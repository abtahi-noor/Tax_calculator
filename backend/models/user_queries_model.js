const mongoose = require('mongoose')

const user_queries_schema = new mongoose.Schema({
        email: String,
        fullName: String,
        topic: String,
        message: String,  
    }, {
        collection: 'user_queries' // preventing auto add 's' in mongodb table 
    }
)

const user_queries_model = mongoose.model("user_queries", user_queries_schema)
module.exports = user_queries_model