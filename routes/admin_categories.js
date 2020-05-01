const express=require('express');
var auth=require('../config/auth');
var isAdmin=auth.isAdmin;

const {createFunction,storeFunction,updateFunction,deleteFunction,editFunction,indexFunction}=require('../controllers/adminCategories');
const router=express.Router();
const {categoryValidator}=require('../validator');
var categoryModel=require('../models/category');
// categry index Function
router.get('/',isAdmin,indexFunction);
router.get('/add-category',isAdmin,createFunction);
router.post('/add-category',isAdmin,categoryValidator,storeFunction);
router.get('/edit-category/:slug',isAdmin,editFunction);
router.post('/edit-category/:slug',isAdmin,categoryValidator,updateFunction);
router.get('/delete-category/:id',isAdmin,deleteFunction);
module.exports=router;