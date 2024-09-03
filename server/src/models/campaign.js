const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    platform: { type: [String], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    about: { type: String, required: true },
    compensation: { type: [String], required: true },
    targetAudience: { type: [String], required: true },
    participants: { type: Number, required: true },
    location: { type: [String], required: true },
    influencers: [{
        name: { type: String, required: true },
        niche: { type: [String], required: true },
        platforms: {
            instagram: { type: String },
            youtube: { type: String }
        },
        campstatus: { type: String, required: true }
    }]
}, { collection: 'campaigns' });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
