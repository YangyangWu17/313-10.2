const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
    {
        imageURL: String,
        description: String
    }
)


module.exports = mongoose.model("Image", imageSchema)
