const jwt = require('jsonwebtoken');
const { decrypt } = require('../utils/encryption')

function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        return res.status(400).json({ msg: "🚫 Un-Authorized 🚫" });
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        if (!payload.isAdmin){
            const usrData = decrypt(payload.usrData)
            const userData = usrData.split("__");
            const userObject = {
                name: userData[0] +' '+ userData[1],
                avatar: userData[2],
                id: userData[3],
            };
            payload.usrData = userObject
        }
        req.payload = payload;
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ msg: "🚫 Token has Expired 🚫" });
        }
        return res.status(400).json({ msg: "🚫 Un-Authorizedsss 🚫" });
    }

    return next();
}
function isValidatedPasswordToken(token) {
    const jwtToken = decrypt(token)
    try {
        const payload = jwt.verify(jwtToken, process.env.JWT_ACCESS_SECRET);
        return payload
    } catch (err) {
        console.log(err.name)
        if (err.name === 'TokenExpiredError') {
            return ({ error : 'Le token est expiré.'});
        }
        return ({ error : 'Token invalide.'});
    }
}

module.exports = {
    isAuthenticated,
    isValidatedPasswordToken
};