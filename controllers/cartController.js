// const { requireSignIn } = require("./common_middleware/authenticate")
// const { findOne } = require("../models/cart_model");

const Cart = require("../models/cart_model");


module.exports.addToCart = function(req,res){

    Cart.findOne({user: req.user._id}).exec((err, cart)=>{
        if(err){ console.log(err); return res.status(400).json({err})}

        if(cart){
            // if cart already exist then update a cart

            const isProductSame = cart.cartItems.find(c => c.product == req.body.cartItems.product);

            if(isProductSame){
                Cart.findOneAndUpdate({"user": req.user._id, "cartItems.product": req.body.cartItems.product},{
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity: isProductSame.quantity + req.body.cartItems.quantity
                        }
                    }
                }).exec((err,_cart)=>{
                    if(err){ console.log(err); return res.status(400).json({err})}
                    if(cart){
                        return res.status(201).json({cart: _cart})
                    }
                })

            }else{
                Cart.findOneAndUpdate({user: req.user._id}, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }).exec((err,_cart)=>{
                    if(err){ console.log(err); return res.status(400).json({err})}
                    if(cart){
                        return res.status(201).json({cart: _cart})
                    }
                })
            }

        }else{
            // if cart don't exist then create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems : [req.body.cartItems]
            })
        
            cart.save((err, cart) => {
                if(err){ console.log(err); return res.status(400).json({err})}
        
                if(cart){
                    return res.status(201).json({cart})
                }
            })
        }
    })
    
}




// ********another way to addToCArt *********

// module.exports.addToCart = async function(req, res){
//     try{
//         // chack if cart already exist or no
//         let cart = await Cart.findOne({user: req.user._id})
//         if(cart){
//             // cart already exist then update cart

//             // cahck if same item already exist or not
//             const sameItem = cart.cartItems.find(c=> c.product == req.body.cartItems.product);

//             if(sameItem){
//                 // yes same item exist so change its quntity 
//                 sameItem.quantity += req.body.cartItems.quantity
//                 cart.save()
//                 return res.status(201).json({cart})
//             }else{
//                 cart.cartItems.push(req.body.cartItems)
//                 cart.save()

//                 return res.status(201).json({cart})

//             }
//         }else{
//             //  cart don't exist so creating new cart
//             let newcart = await Cart.create({
//                 user: req.user._id,
//                 cartItems:[req.body.cartItems]
//             })
            
//             return res.status(201).json({newcart})
//         }
//     }catch(err){
//         if(err){ console.log(err); return res.status(400).json({err})}
//     }
// }