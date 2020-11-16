
const jwt = require('jsonwebtoken'); 


module.exports.requireSignIn = function(req, res, next){

    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.jwt_secret_key);
        req.user = user;
    }else{
        return res.status(400).json({
            message: "Authorization Require"
        })
    }
    next();
}

module.exports.isAdmin = (req, res, next)=>{
    // console.log(req.user)
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message: 'Admin Access denied'
        })
    }

    next();
}

module.exports.isUser = (req, res, next)=>{
    // console.log(req.user)
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message: 'User Access denied'
        })
    }

    next();
}