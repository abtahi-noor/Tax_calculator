const mongoose = require('mongoose')

const gov_tax_infos_schema = new mongoose.Schema({
        u : String,
        year: Number,
        incomeTax: Number,
        landTax: Number,
        roadTax: Number,
        status: { type: String, default: "pending" }

    }, {
        collection: 'gov_tax_infos' // preventing auto add 's' in mongodb table 
    }
)

const gov_tax_infos_model = mongoose.model("gov_tax_infos", gov_tax_infos_schema)
module.exports = gov_tax_infos_model