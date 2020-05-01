const pageModel=require('../models/page');
const productModel=require('../models/product');
const categoryModel=require('../models/category');
const fs=require('fs-extra');
exports.clearCartFunction=(req,res)=>{
    delete req.session.cart;
    req.flash('danger','cart Cleared!');
        res.redirect('/cart/checkout');


}
exports.buyNowFunction=(req,res)=>{
    delete req.session.cart;
    res.sendStatus(200);
    // req.flash('danger','cart Cleared!');
        // res.redirect('/cart/checkout');


}
exports.cartUpdateFunction=(req,res)=>{
    var slug=req.params.product;
    var cart=req.session.cart;
    var action=req.query.action;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title==slug) {
            switch (action) {
                case "add":
                    cart[i].qty++;
                    
                    break;
                case "remove":
                    cart[i].qty--;
                    if (cart[i].qty<1) {
                        cart.splice(i,1);
                        
                        
                    }
                    
                    break;
                case "clear":
                    cart.splice(i,1);
                    if (cart.length==0) {
                        delete req.session.cart;
                        
                    }
                    
                    break;
                
                default:
                    console.log('updated problem');
                    break;
            }
            break;
            
        }
        
    }
    req.flash('success','cart updated!');
        res.redirect('/cart/checkout');



}
exports.checkoutFunction=(req,res)=>{
    if (req.session.cart && req.session.cart.length==0) {
        delete req.session.cart;
        res.redirect('/cart/checkout');

        
    }
    else{
        res.render('front/checkout',{
            title:'Checkout',
            cart:req.session.cart
    
        });

    }
  
}
exports.cartFunction=(req,res)=>{
    var slug=req.params.product;
    productModel.findOne({slug:slug},(err,p)=>{
        if (err) {
            console.log(err);
            
        }
        if (typeof req.session.cart=="undefined") {
            req.session.cart=[];
            req.session.cart.push({
                title:slug,
                qty:1,
                price:parseFloat(p.price).toFixed(2),
                image:'/product_images/'+p._id+'/'+p.image
            });
            
        }
        else{
            var cart=req.session.cart;
            var newItem=true;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].title==slug) {
                    cart[i].qty++;
                    newItem=false;
                    break; 
                }
            }
                if (newItem) {
                    cart.push({
                        title:slug,
                        qty:1,
                        price:parseFloat(p.price).toFixed(2),
                        image:'/product_images/'+p._id+'/'+p.image
                    });

                    
                }
               
                
            
        }
        // console.log(req.session.cart);
        req.flash('success','product added!');
        res.redirect('back');

    });

 
 }