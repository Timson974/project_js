app.use(function(req, res, next) {
    if (!req.headers.authorization && req.path !== '/login' && req.path !== '/register') {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    next();
});
