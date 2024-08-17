const jwt = require('jsonwebtoken')

// Middleware Authenticaiton
exports.requireLogin = (req, res, next) => {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            //Verify the token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //attach token to request
            req.user = decode;
            next();
        } else {
            return res.status(400).json({ message: "unauthorized"});
        }
    } catch (err) {
        console.log('Something went wrong')
    }
}