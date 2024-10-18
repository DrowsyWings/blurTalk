// PollModel.js
const mongoose = require('mongoose');
const cuid = require('cuid');

const pollSchema = new mongoose.Schema({
    pollId: { type: String, default: cuid },
    question: { type: String, required: true },
    options: [
        {
        optionText: { type: String, required: true },
        votes: { type: Number, default: 0 },
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Keep track of users who voted
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Poll', pollSchema);
