const express=require('express');

const {createFunction,storeFunction,updateFunction,deleteFunction,editFunction,indexFunction}=require('../controllers/adminCategories');
const router=express.Router();
const {categoryValidator}=require('../validator');
var categoryModel=require('../models/category');
// categry index Function
router.get('/',indexFunction);
router.get('/add-category',createFunction);
router.post('/add-category',categoryValidator,storeFunction);
router.get('/edit-category/:slug',editFunction);
router.post('/edit-category/:slug',categoryValidator,updateFunction);
router.get('/delete-category/:id',deleteFunction);
module.exports=router;