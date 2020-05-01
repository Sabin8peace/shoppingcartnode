const express=require('express');
const controller=require('../controllers/cartController');
const router=express.Router();
router.get('/add/:product',controller.cartFunction);
router.get('/checkout',controller.checkoutFunction);
router.get('/clear',controller.clearCartFunction);
router.get('/buynow',controller.buyNowFunction);
router.get('/update/:product',controller.cartUpdateFunction);
module.exports=router;