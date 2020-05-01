const pageModel=require('../models/page');
const productModel=require('../models/product');
const categoryModel=require('../models/category');
const fs=require('fs-extra');



exports.getPage=(req,res)=>{
    var slug=req.params.slug;
    pageModel.findOne({slug:slug},(err,data)=>{
        if (err) {
            return console.log(err);
            
        }
        if (!data) {
            res.redirect('/');
            
        }
        else{
            res.render('index',{
                title:data.title,
                body:data.description
            });

        }

    });

}
exports.getallProduct=(req,res)=>{
    productModel.find((err,products)=>{
        if (err) {
            return console.log(err);
            
        }
    
            res.render('front/all_products',{
                title:"All Products",
                products:products
            });

       

    });

}
exports.getProductByCategory=(req,res)=>{
    var catslug=req.params.slug;
    categoryModel.findOne({slug:catslug},(err,data)=>{
        if (err) {
            return console.log(err);
            
        }
        productModel.find({category:catslug},(err,products)=>{
            if (err) {
                return console.log(err);
                
            }
        
                res.render('front/cat_products',{
                    title:data.title,
                    products:products
                });
    
           
    
        }); 

    });

  

}
exports.productDetail=(req,res)=>{
    var galleryImages=null;
    var loggedIn=(req.isAuthenticated())?true:false;
    // console.log("loggedin",loggedIn);
    var slug=req.params.product;
    productModel.findOne({slug:slug},(err,p)=>{
        if (err) {
            console.log(err);
            
        }
        else{
            var gallerydir='public/product_images/'+p._id+'/gallery';
            fs.readdir(gallerydir,(err,files)=>{
                if(err){
                    console.log(err)
                }
                else{
                    galleryImages=files;
                    res.render('front/product',{
                        title:p.title,
                        product:p,
                        galleryImages:galleryImages,
                        loggedIn:loggedIn

                    });
                }


            });


            

        }
  
    });

}

exports.indexFunction=(req,res)=>{
// res.send("this is front page");
var mysort = {sorting: 1 };
pageModel.find().sort(mysort)
    .then((pages)=>{
        req.app.locals.navpages=pages;
    
        // res.render('index',{
        //     pages:pages
        // });
})
.catch(err=>console.log(err));
pageModel.findOne({slug:'home'},(err,data)=>{
    if (err) {
        return console.log(err);
        
    }
    if (!data) {
        res.redirect('/');
        
    }
    else{
        res.render('index',{
            title:data.title,
            body:data.description
        });

    }

});

}