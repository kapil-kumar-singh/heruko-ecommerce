const express = require('express');
const { addToCart } = require('../controllers/cartController');
const { requireSignIn, isUser } = require('../controllers/common_middleware/authenticate');
const router = express.Router();

router.post('/add-item-to-cart', requireSignIn, isUser, addToCart);

module.exports = router;