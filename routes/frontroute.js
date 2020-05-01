const express=require('express');
const controller=require('../controllers/frontController');
const router=express.Router();
//middleware setup to show all product only for logged in user 
var auth=require('../config/auth');
var isUser=auth.isUser;

var auth=require('../config/auth');
// router.get('/products',isUser,controller.getallProduct);
router.get('/products',controller.getallProduct);
router.get('/products/:category/:product',controller.productDetail);
router.get('/',controller.indexFunction);
router.get('/:slug',controller.getPage);//get page
router.get('/products/:slug',controller.getProductByCategory);//get page
module.exports=router;