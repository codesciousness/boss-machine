const express = require('express');
const meetingsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require('./db');

// GET /api/meetings to get an array of all meetings

meetingsRouter.get('/', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database

meetingsRouter.post('/', (req, res) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    if (newMeeting) {
        res.status(201).send(newMeeting);
    }
    else {
        res.status(500).send('Internal Server Error');
    }
});

// DELETE /api/meetings to delete all meetings from the database

meetingsRouter.delete('/', (req, res) => {
    const meetings = deleteAllFromDatabase('meetings');
    if (meetings.length === 0) {
        res.status(204).send();
    }
    else {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = meetingsRouter;