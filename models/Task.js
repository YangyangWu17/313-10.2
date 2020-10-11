const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')

const taskSchema = new mongoose.Schema(
    {

        type: String,
        title: {
            type: String,
            required: true
        }
        ,
        description: String,
        expiryDate: String,
        setting: String,
        master: String,
        reward: String,
        number: String,
        image: String
    }
)
taskSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("Task", taskSchema)
