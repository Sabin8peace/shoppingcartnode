const express=require('express');

const controller=require('../controllers/frontController');
const router=express.Router();

router.get('/products',controller.getallProduct);
router.get('/',controller.indexFunction);
router.get('/:slug',controller.getPage);//get page
module.exports=router;