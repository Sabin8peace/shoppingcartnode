const productModel=require('../models/product');
const categoryModel=require('../models/category');
const mkdirp=require('mkdirp');
// const fs=require('fs');
const fs=require('fs-extra');
const resizeImg=require('resize-img');
var S = require('string');

exports.updateFunction=(req,res)=>{
    imageFile=S(imageFile).replaceAll(' ', '-');  
    var title=req.body.title;
    var description=req.body.description;
    var price=req.body.price;
    var category=req.body.category;
    var pimage=req.body.pimage;
    var slug=S(title).replaceAll(' ', '-');
    var id=req.params.id;
    if(errors){ 
        console.log('errors',errors); 
        req.session.errors=errors;
        res.redirect('/admin/products/edit/'+id);

    }
    else{
        productModel.findOne({slug:slug,_id:{'$ne':id}},function(err,productdata){
            if (err) {
                console.log(err);
                
            }
            if(productdata){
                req.flash('danger','Product Already Exist Choose new');
                res.redirect('/admin/products/edit'+id);

            }
            else
            {
                productModel.findById(req.params.id,(err,p)=>{
                    p.title=title;
                    p.slug=slug;
                    p.price=parseFloat(price).toFixed(2);
                    p.description=description;
                    p.category=category;
                    if(imageFile !=""){
                        p.image=imageFile;
                        
                        

                    };
                    p.save((err)=>{
                        if(err){
                            console.log(err);

                        }
                        if(imageFile !=""){
                        
                            if (pimage!="") {
                                fs.remove('public/product_images/'+slug+'/'+pimage,(err)=>{
                                    if(err){
                                        console.log(err);
            
                                    }

                                });

                                
                            }
                            const folderName='public/product_images/'+id+'/';

                            var productImage=req.files.image;
                            // storeImgname=S(imageFile).replaceAll(' ', '-')
                            var path=folderName+imageFile;
                            productImage.mv(path, {mkdirp: true},function(err){
                                return console.log(err);
    
                            }); 
    
                        };
                        // here is msg
                        console.log("done");
                        req.flash('success',"Product edited");
                        res.redirect('/admin/products/');
    

                    });



                });

                

            }
            
        });



    }
   

}
exports.editFunction=(req,res)=>{
    var errors;
    if(req.session.errors){
        
        errors=req.session.errors;
    }
    req.session.errors=null;
    var id=req.params.id;

    categoryModel.find((err,category)=>{
        productModel.findById(req.params.id,(err,productdata)=>{
            // console.log(productdata.description);
            if(err)
                    {
                        console.log(err);
                        res.redirect('/admin/products');
                    }
                    var gallerydir='public/product_images/'+productdata.id+'/gallery/thumbs/';
                    var imgdir='/product_images/'+productdata.id+'/';
                    var galleryImages=null;
                    fs.readdir(gallerydir,(err,files)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                            console.log(files);
                            galleryImages=files;
                            res.render('admin/product/edit',{
                                title:productdata.title,
                                slug:productdata.slug,
                                price:parseFloat(productdata.price).toFixed(2),
                                description:productdata.description,
                                image:productdata.image,
                                id:productdata._id,
                                category:productdata.category,
                                galleryImages:galleryImages,
                                categories:category,
                                gallerydir:gallerydir,
                                imgdir:imgdir
            
                            });
                        }


                    });
                   
    
    
    
        });
    
    });

    // console.log("edit page",req.params.slug);
    

 
}
exports.storeFunction=(req,res)=>{

    imageFile=S(imageFile).replaceAll(' ', '-');  
    var title=req.body.title;
    var description=req.body.description;
    var price=req.body.price;
    var category=req.body.category;
    var slug=S(title).replaceAll(' ', '-');
    // var errors=req.validationErrors();
    if(errors){  
        categoryModel.find((err,category)=>{
            res.render('admin/product/create',{
                errors:errors,
                title:title,
                slug:slug,
                price:price,
                description:description,
                category:category
            });
        });
    }
    else {
        console.log("else1");
        productModel.findOne({slug:slug},function(err,productdata){
            if(productdata){
                console.log("inside");
                req.flash('danger','Product Already Exist Choose new');
                categoryModel.find((err,category)=>{
                    res.render('admin/product/create',{
                        errors:errors,
                        title:title,
                        slug:slug,
                        price:price,
                        description:description,
                        category:category
                    });
                });
            }else{
                var price2=parseFloat(price).toFixed(2);
                var productdata=new productModel({
                    title:title,
                    slug:slug,
                    price:price2,
                    description:description,
                    image:imageFile,
                    category:category
                });
                productdata.save(function(err){
                    if(err)
                    {
                        return console.log(err);
                    }
                    const folderName='public/product_images/'+productdata._id+'/';


                    try {
                    if (!fs.existsSync(folderName)) {
                        fs.mkdirSync(folderName)
                    }
                    } catch (err) {
                    console.error(err)
                    }
                    try {
                        if (!fs.existsSync(folderName+'gallery')) {
                            fs.mkdirSync(folderName+'gallery')
                        }
                        } catch (err) {
                        console.error(err)
                        }
                        
                    try {
                        if (!fs.existsSync(folderName+'gallery/thumbs')) {
                            fs.mkdirSync(folderName+'gallery/thumbs')
                        }
                        } catch (err) {
                        console.error(err)
                        }
                        
                

                    if(imageFile !=""){
                        
                        var productImage=req.files.image;
                        // storeImgname=S(imageFile).replaceAll(' ', '-')
                        var path=folderName+imageFile;
                        productImage.mv(path, {mkdirp: true},function(err){
                            return console.log(err);

                        }); 

                    };
                    
                    console.log("done");
                    req.flash('success',"Product added");
                    res.redirect('/admin/products');

                });

            }

        });
        // console.log("success");
    }


}
exports.createFunction=(req,res)=>{
        var title="";
        var slug="";
        var price="";
        var description="";
        var image="";
        categoryModel.find((err,category)=>{
            res.render('admin/product/create',{
                title:title,
                slug:slug,
                price:price,
                description:description,
                image:image,
                category:category
            });


        });
       
  
}
exports.indexFunction=(req,res)=>{
    var count;
    // productModel.count((err,c)=>{
    //     console.log(err);
    //     count=c;

    // });
    productModel.countDocuments(function(err, c) {
        count=c;
   });
    // console.log(count);

    productModel.find().sort()
        .then((datas)=>{
            res.render('admin/product/index',{
            datas:datas,
            count:count
        });
    })
    .catch(err=>console.log(err));


}

exports.deleteFunction=(req,res)=>{
    var id=req.params.id;
    var path='public/product_images/'+id;
    fs.remove(path,(err)=>{
        if(err)
            {
                return console.log(err);
            }
            else{
                  productModel.findByIdAndDelete(id,(err)=>{
        if(err)
        {
            return console.log(err);
        }
        req.flash('success',"Product Deleted");
        res.redirect('/admin/products');

    })

            }

    });

    // categoryModel.findByIdAndDelete(req.params.id,(err)=>{
    //     if(err)
    //     {
    //         return console.log(err);
    //     }
    //     console.log("done");
    //     req.flash('success',"Category Deleted");
    //     res.redirect('/admin/categories');

    // })

}
exports.deleteGallery=(req,res)=>{
    id=req.query.id;
    var originalimage='public/product_images/'+req.query.id+'/gallery/'+req.params.image;
    var thumbpath='public/product_images/'+req.query.id+'/gallery/thumbs/'+req.params.image;
    fs.remove(originalimage,(err)=>{
        if (err) {
            console.log(err);
            
        }
        else{
            fs.remove(thumbpath,(err)=>{

                if (err) {
                    console.log(err);
                    
                }
                else{
                    req.flash('success',"Gallery Image Deleted");
                    res.redirect('/admin/products/edit/'+id);
                    

                }
            })
        }


    });


   
    
}
exports.uploadGallery=(req,res)=>{
    var uploadedimg=req.files.file;
    console.log(req.files.file.name);

    var id=req.params.id;
    var path='public/product_images/'+id+'/gallery/'+req.files.file.name;
    var thumbpath='public/product_images/'+id+'/gallery/thumbs/'+req.files.file.name;
    uploadedimg.mv(path,function(err){
        if(err)
        {
            return console.log(err);
        }

        resizeImg(fs.readFileSync(path),{width:100,height:100}).then(buff=>{
            fs.writeFileSync(thumbpath,buff);

        });

    }); 

    // categoryModel.findByIdAndDelete(req.params.id,(err)=>{
    //     if(err)
    //     {
    //         return console.log(err);
    //     }
        console.log("done");
        req.flash('success',"Category Deleted");
        // res.redirect('/admin/products');
        res.sendStatus(200);

    // })

}
