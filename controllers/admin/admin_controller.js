const User = require('../../models/user');
const jwt = require('jsonwebtoken'); 

module.exports.sing_up = function(req, res){
    // console.log('here',req.body);
   User.findOne({email : req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in sign up', err); return;}
       
        if(!user){
            User.create({
                firstName: req.body.firstName,
                lastName :req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                username: Math.random().toString(),
                role : 'admin'

            }, function(err, user){
                
                if(err){
                    // console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong'
                    })
                }

                return res.status(201).json({
                    message: "Admin created successfully"
                })
            })
        }else{
            return res.status(400).json({
                message: 'admin already registered'
            })
        }
   })
};

module.exports.sign_in = async function(req,res){
    // console.log(req.body);
    
    try{

        let user = await User.findOne({email: req.body.email});
        // console.log(user.authentication(req.body.password));
        if(!user ){
            return res.status(422).json({
                message: 'Invalid username/password'
            })  
        }

        if(user.authentication(req.body.password) && user.role === 'admin'){
            const token = jwt.sign({_id: user._id, role: user.role},process.env.jwt_secret_key, {expiresIn:"1h"})
            const { _id, firstName, lastName, email, role, fullname} = user;
            res.cookie('token', token, { expiresIn: '1h' } )
            return res.status(200).json({
                token,
                user: { _id, firstName, lastName, email, role, fullname}
            });
        }else{
            return res.status(422).json({
                message: 'Invalid username/password'
            }) 
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
};

exports.sign_out = (req, res) => {
    res.clearCookie('token');
    res.status(200).json(({
        message: 'SignOut successfully...!'
    }))
}