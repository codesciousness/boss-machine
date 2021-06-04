const express = require('express');
const ideasRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// GET /api/ideas to get an array of all ideas

ideasRouter.get('/', (req, res) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database

ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

//ideaId param

ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaId = id;
    const ideas = getAllFromDatabase('ideas');
    const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
    if (ideaIndex > -1) {
        req.ideaId = ideaId;
        next();
    }
    else {
        res.status(404).send('Not Found');
    }
});

// GET /api/ideas/:ideaId to get a single idea by id

ideasRouter.get('/:ideaId', (req, res) => {
    const idea = getFromDatabaseById('ideas', req.ideaId);
    res.send(idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id

ideasRouter.delete('/:ideaId', (req, res) => {
    const ideaDeleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (ideaDeleted) {
        res.status(204).send();
    }
    else {
        res.status(404).send('Not Found');
    }
});

module.exports = ideasRouter;