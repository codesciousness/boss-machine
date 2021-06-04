const { getFromDatabaseById } = require('./db');

const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const worth1Mil = numWeeks * weeklyRevenue >= 1000000;
    if (worth1Mil) {
        next();
    }
    else {
        res.status(400).send('Bad Request');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
