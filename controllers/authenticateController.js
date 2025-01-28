const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('401 Unauthorized - You are not authorized to view this webpage');
    }
}

module.exports = {
    isAuthenticated
}