const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupedChat: {
        type: Boolean,
        default: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Messages"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
},{
    timestamps: true
})

module.exports = mongo.model("Chat", chatModel);