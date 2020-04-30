const pageModel=require('../models/page');
const productModel=require('../models/product');

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
    var slug=req.params.slug;
    productModel.find((err,products)=>{
        if (err) {
            return console.log(err);
            
        }
    
            res.render('all_products',{
                title:"All Products",
                products:products
            });

       

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