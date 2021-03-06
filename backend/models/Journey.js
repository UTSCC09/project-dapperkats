const { default: mongoose } = require("mongoose");
const { model, Schema } = require("mongoose");

const JourneySchema = new Schema({
    username: String,
    title: String,
    imageId: String,
    description: String,
    fromDate: Date,
    toDate: Date,
    published: Boolean,
    suggestionsEnabled: Boolean,
    isPublic: Boolean,
    viewers: [String],
    journeyType: {
        type: String,
        enum: ['PREVIOUS', 'PLAN'],
        default: 'PREVIOUS'
    }
}, { timestamps: true });

module.exports = model("Journey", JourneySchema);