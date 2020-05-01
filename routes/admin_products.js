const express=require('express');
// const mkdirp=require('mkdirp');
const fs=require('fs-extra');

// const resizeImg=require('resize-img');
const {createFunction,storeFunction,deleteGallery,uploadGallery,updateFunction,deleteFunction,editFunction,indexFunction}=require('../controllers/adminProducts');
const router=express.Router();
const {productValidator}=require('../validator');
// var productModel=require('../models/product');
// categry index Function
router.get('/',indexFunction);
router.get('/create',createFunction);
router.post('/create',productValidator,storeFunction);
router.get('/edit/:id',editFunction);
router.post('/edit/:id',productValidator,updateFunction);
router.get('/delete/:id',deleteFunction);
router.post('/upload-gallery/:id',uploadGallery);
router.get('/delete-image/:image',deleteGallery);
module.exports=router;