const jwt = require('jsonwebtoken');


function generateCreatePassewordToken(email) {
    return jwt.sign({
        id: email,
    }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '72h',
    });
}


function generateCreatePassewordTokenWithUserId(userId) {
    const encoded = Buffer.from(userId, 'utf8').toString('base64')
    console.log(encoded)
    return encoded
}

module.exports = {
    generateCreatePassewordToken,
    generateCreatePassewordTokenWithUserId
};