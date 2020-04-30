const categoryModel=require('../models/category');
var S = require('string');

exports.updateFunction=(req,res)=>{
     
    var title=req.body.title;
    var slug=S(req.body.slug).replaceAll(' ', '-');
    var id=req.body.id;
    if (slug=="") {
        slug=S(title).replaceAll(' ', '-');
        
    }
    if(errors){ 
        console.log("errr");
    res.render('admin/edit_category',{
        errors:errors,
        title:title,
        slug:slug,
        id:id
    });
    }
    else {
        console.log("else1");
        categoryModel.findOne({slug:slug,_id:{'$ne':id}},function(err,page){
            if(page){
                console.log("inside");
                req.flash('danger','Category Already Exist Choose new');
                res.render('admin/edit_category',{
                    title:title,
                    slug:slug,
                    id:id
                });
            }else{
                categoryModel.findById(id,(err,pagedata)=>{
                if(err)
                {
                    return console.log(err);
                }
                pagedata.title=title;
                pagedata.slug=slug;
                pagedata.save(function(err){
                    if(err)
                    {
                        return console.log(err);
                    }
                    console.log("done");
                    req.flash('success',"Category updated");
                    res.redirect('/admin/categories');

                });

               });
               

            }

        });
        // console.log("success");
    }


}
exports.editFunction=(req,res)=>{
    // console.log("edit page",req.params.slug);
    categoryModel.findOne({slug:req.params.slug},(err,pagedata)=>{
        // console.log(pagedata.description);
        if(err)
                {
                    return console.log(err);
                }
               
                res.render('admin/edit_category',{
                    title:pagedata.title,
                    slug:pagedata.slug,
                    id:pagedata._id

                });


    });

 
}
exports.storeFunction=(req,res)=>{
     
    var title=req.body.title;
    var slug=S(req.body.slug).replaceAll(' ', '-');
    if (slug=="") {
        slug=S(title).replaceAll(' ', '-');
        
    }
    if(errors){ 
        console.log("errr");
    res.render('admin/add_category',{
        errors:errors,
        title:title,
        slug:slug,
    });
    }
    else {
        console.log("else1");
        categoryModel.findOne({slug:slug},function(err,page){
            if(page){
                console.log("inside");
                req.flash('danger','Category Already Exist Choose new');
                res.render('admin/add_category',{
                    title:title,
                    slug:slug,
                });
            }else{
                var pagedata=new categoryModel({
                    title:title,
                    slug:slug,
                });
                pagedata.save(function(err){
                    if(err)
                    {
                        return console.log(err);
                    }
                    console.log("done");
                    req.flash('success',"Category added");
                    res.redirect('/admin/categories');

                });

            }

        });
        // console.log("success");
    }


}
exports.createFunction=(req,res)=>{
        var title="";
        var slug="";
        res.render('admin/add_category',{
            title:title,
            slug:slug,
        });
  
}
exports.indexFunction=(req,res)=>{
    var mysort = {sorting: 1 };
    categoryModel.find().sort(mysort)
        .then((categories)=>{
            res.render('admin/categories',{
            categories:categories
        });
    })
    .catch(err=>console.log(err));


}

exports.deleteFunction=(req,res)=>{
    categoryModel.findByIdAndDelete(req.params.id,(err)=>{
        if(err)
        {
            return console.log(err);
        }
        console.log("done");
        req.flash('success',"Category Deleted");
        res.redirect('/admin/categories');

    })

}