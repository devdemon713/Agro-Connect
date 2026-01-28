const Request = require('../models/Request');

exports.getFarmerRequests = async (req, res) => {
    try {
        const requests = await Request.find({ farmer: req.user.id })
            .populate('buyer', 'name email phone address')
            .populate('product', 'name price');
        res.json(requests);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.updateRequestStatus = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ msg: "Request not found" });
        
        request.status = req.body.status;
        await request.save();
        res.json(request);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// Ensure the name here matches exactly what you import in the routes
exports.getBuyerRequests = async (req, res) => {
    try {
        const Request = require('../models/Request'); // Ensure model is imported
        const requests = await Request.find({ buyer: req.user.id })
            .populate('farmer', 'name phone address')
            .populate('product', 'name image');
        res.json(requests);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};