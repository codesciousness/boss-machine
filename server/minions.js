const express = require('express');
const minionsRouter = express.Router();
const workRouter = require('./work');
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// GET /api/minions to get an array of all minions

minionsRouter.get('/', (req, res) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

// POST /api/minions to create a new minion and save it to the database

minionsRouter.post('/', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

//minionId param

minionsRouter.param('minionId', (req, res, next, id) => {
    const minionId = id;
    const minions = getAllFromDatabase('minions');
    const minionIndex = minions.findIndex(minion => minion.id === minionId);
    if (minionIndex > -1) {
        req.minionId = minionId;
        next();
    }
    else {
        res.status(404).send('Not Found');
    }
});

// GET /api/minions/:minionId to get a single minion by id

minionsRouter.get('/:minionId', (req, res) => {
    const minion = getFromDatabaseById('minions', req.minionId);
    res.send(minion);
});

// PUT /api/minions/:minionId to update a single minion by id

minionsRouter.put('/:minionId', (req, res) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id

minionsRouter.delete('/:minionId', (req, res) => {
    const minionDeleted = deleteFromDatabasebyId('minions', req.minionId);
    if (minionDeleted) {
        res.status(204).send();
    }
    else {
        res.status(404).send('Not Found');
    }
});

minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;