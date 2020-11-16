const { default: slugify } = require('slugify');
const Product = require('../models/product_model');


// module.exports.createProduct = function(req,res){
//     const { name , price, description, category, createdBy, quantity} = req.body
//     let productPictures=[];
//     if(req.files.length > 0){
//         productPictures = req.files.map(flie=>{ return { img: flie.filename } })
//     }
//     const product = new Product({
//         name : name,
//         slug : slugify(name),
//         price,
//          quantity,
//         description,
//         productPictures,
//         category,
//         createdBy: req.user._id
//     })
//     product.save((err, product)=>{
//      if(err){
//         return res.status(400).json({ err });
//      }
//     if(product){
//         res.status(200).json({product});
//      }
//     })
// }



module.exports.createProduct =  function(req,res){
    const { name , price, description, category, quantity} = req.body
    let productPictures=[];
    if(req.files.length > 0){
        productPictures = req.files.map(flie=>{ return { img: flie.filename } })
    }

    Product.create({
        name : name,
        slug : slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    }, function(err, product){
        if(err){
            return res.status(400).json({ err });
        }
        if(product){
            res.status(200).json({product});
        }
    })
}