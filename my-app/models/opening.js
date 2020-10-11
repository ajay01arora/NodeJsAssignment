const mongoose = require('mongoose');
const schema = mongoose.Schema;

const openingSchema =new schema({
    _id: String,
    project : String,
    client: String,
    technology: [],
    role: String,
    description: String,
    status: String,
    createdBy: String,
})

  

module.exports = mongoose.model("Open", openingSchema);