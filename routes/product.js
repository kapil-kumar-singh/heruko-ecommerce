const express = require('express');
const router = express.Router();
const { requireSignIn, isAdmin } = require('../controllers/common_middleware/authenticate');
const { createProduct } = require('../controllers/productController');


const multer = require('multer');
const shortid = require('shortid');
const path =require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '/upload/product'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
  })
   
const upload = multer({ storage : storage})


router.post('/create', requireSignIn, isAdmin, upload.array('productPicture'),createProduct);


module.exports = router;
