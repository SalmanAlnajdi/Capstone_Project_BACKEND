const Event = require("../../models/Event");

exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(201).json(events);
    } catch (err) {
        next(err);
    }
}

exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        next(err);
    }
}
