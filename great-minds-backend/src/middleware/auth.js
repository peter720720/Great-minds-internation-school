const jwt = require('jsonwebtoken');

const getToken = (req) => req.headers.authorization?.split(' ')[1];

exports.protectUser = (req, res, next) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ message: 'Authorization required.' });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Expired or broken session token.' });
    }
};

exports.protectAdmin = (req, res, next) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ message: 'Administrator authorization required.' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.role !== 'admin') {
            return res.status(403).json({ message: 'Administrator access only.' });
        }
        req.admin = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Expired or broken administrator session token.' });
    }
};
