const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const worth1Mil = Number(numWeeks) * Number(weeklyRevenue) >= 1000000;
    if (worth1Mil) {
        next();
    }
    else {
        res.status(400).send('Bad Request');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;