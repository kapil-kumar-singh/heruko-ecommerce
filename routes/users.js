const express = require('express');
const userController = require('../controllers/user_controller');
const authenticate = require('../controllers/common_middleware/authenticate')
const { isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../controllers/validators/validater');
const router = express.Router();

router.post('/sign-up', validateSignUpRequest, isRequestValidated, userController.sing_up);
router.post('/sign-in', validateSignInRequest, isRequestValidated, userController.sign_in);
router.get('/profile', authenticate.requireSignIn, (req,res)=>{
    return res.status(200).json({
        message: 'user rofile'
    })
})

router.use('/cart', require('./cart'));

module.exports = router;