const mongoose = require('mongoose')

const incomeTaxVariables_schema = new mongoose.Schema({
        maleCondition1: Number,
        maleCondition2: Number,
        maleCondition3: Number,
        maleCondition4: Number,
        maleCondition5: Number,
        femaleCondition1: Number,
        femaleCondition2: Number,
        femaleCondition3: Number,
        femaleCondition4: Number,
        femaleCondition5: Number,
        fighterCondition1: Number,
        fighterCondition2: Number,
        fighterCondition3: Number,
        fighterCondition4: Number,
        fighterCondition5: Number,
        
    }, {
        collection: 'incomeTaxVariables' // preventing auto add 's' in mongodb table 
    }
)

const incomeTaxVariables_model = mongoose.model("incomeTaxVariables", incomeTaxVariables_schema)
module.exports = incomeTaxVariables_model