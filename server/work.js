const express = require('express');
const workRouter = express.Router({ mergeParams: true });
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// GET /api/minions/:minionId/work to get an array of all work for the specified minon

workRouter.get('/', (req, res) => {
    let work = getAllFromDatabase('work');
    work = work.filter(workItem => workItem.minionId === req.minionId);
    res.send(work);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database

workRouter.post('/', (req, res) => {
    const newWork = addToDatabase('work', req.body);
    if (newWork) {
        res.status(201).send(newWork);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

//workId param

workRouter.param('workId', (req, res, next, id) => {
    const workId = id;
    const work = getAllFromDatabase('work');
    const workIndex = work.findIndex(workItem => workItem.id === workId);
    if (workIndex > -1) {
        req.workId = workId;
        next();
    }
    else {
        res.status(404).send('Not Found');
    }
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id

workRouter.put('/:workId', (req, res) => {
    const work = getFromDatabaseById('work', req.workId);
    if (work.minionId === req.minionId) {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
    else {
        res.status(400).send('Bad Request');
    }
    
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id

workRouter.delete('/:workId', (req, res) => {
    const workDeleted = deleteFromDatabasebyId('work', req.workId);
    if (workDeleted) {
        res.status(204).send();
    }
    else {
        res.status(404).send('Not Found');
    }
});

module.exports = workRouter;