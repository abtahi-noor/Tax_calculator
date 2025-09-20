const mongoose = require('mongoose')

const card_infos_schema = new mongoose.Schema({
        u: String,
        cardName: String,
        cardNum: Number,
        expDate: Date,
        cvc: Number,
        zip: Number  
    }, {
        collection: 'card_infos' // preventing auto add 's' in mongodb table 
    }
)

const card_infos_model = mongoose.model("card_infos", card_infos_schema)
module.exports = card_infos_model