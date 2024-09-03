const Campaign = require('../models/campaign');

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit a campaign's influencer campstatus
// exports.editCampaign = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { influencerName, campstatus } = req.body;

//         // Find the campaign by ID
//         const campaign = await Campaign.findById(id);
//         if (!campaign) {
//             return res.status(404).json({ message: 'Campaign not found' });
//         }

//         // Find the influencer index
//         const influencerIndex = campaign.influencers.findIndex(influencer => influencer.name === influencerName);
//         if (influencerIndex === -1) {
//             return res.status(404).json({ message: 'Influencer not found' });
//         }

//         // Update the campstatus for the found influencer
//         campaign.influencers[influencerIndex].campstatus = campstatus;

//         // Save the updated campaign document
//         await campaign.save();

//         res.json({ message: 'Campaign status updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.editCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // This will contain the fields to update

        // Find the campaign by ID
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        if (updates.status) {
            campaign.status = updates.status;
        }

        // Update the campstatus for a specific influencer if influencerName is provided
        if (updates.campstatus) {
            const influencerIndex = campaign.influencers.findIndex(influencer => influencer.name === updates.influencerName);
            if (influencerIndex !== -1) {
                campaign.influencers[influencerIndex].campstatus = updates.campstatus;
            } else {
                return res.status(404).json({ message: 'Influencer not found' });
            }
        }

        // Save the updated campaign document
        await campaign.save();

        res.json({ message: 'Campaign updated successfully', campaign });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
