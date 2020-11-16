const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/admin_controller');
const { requireSignIn } = require('../../controllers/common_middleware/authenticate');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../../controllers/validators/validater');
router.post('/sign-up', validateSignUpRequest,isRequestValidated ,adminController.sing_up);
router.post('/sign-in', validateSignInRequest, isRequestValidated,adminController.sign_in);
router.post('/sign-out',requireSignIn, adminController.sign_out)
router.get('/profile', requireSignIn, (req,res)=>{
    return res.status(200).json({
        message: 'admin rofile'
    })
})


module.exports = router;