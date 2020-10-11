const mongoose = require('mongoose');
const schema = mongoose.Schema;

const openingSchema =new schema({
    // _id: String,
    project : String,
    client: String,
    technology: [],
    role: String,
    description: String,
    status: String,
    appliedBy: [{ type:schema.Types.ObjectId, ref: "User" }],
    createdBy: {type:schema.Types.ObjectId , ref:'User'}//String,
}, { timestamps: true })

  

module.exports = mongoose.model("Open", openingSchema);