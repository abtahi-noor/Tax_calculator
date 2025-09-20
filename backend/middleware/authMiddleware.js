const checkUser = (req, res, next) => {
    const userEmail = req.session.userEmail;

    if (userEmail) {
        // User is logged in, you can access userEmail in your routes
        res.locals.userEmail = userEmail;
    } else {
        res.locals.userEmail = null;
    }

    next();
};

module.exports = { checkUser };

/*
const jwt = require('jsonwebtoken');
 
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'cse471secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        console.log("error");
    }


}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'cse471secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();

    }
}



module.exports = {requireAuth, checkUser};

*/