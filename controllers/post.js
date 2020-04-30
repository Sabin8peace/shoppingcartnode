const pageModel=require('../models/page');
var S = require('string');

exports.editPage=(req,res)=>{
    // console.log("edit page",req.params.slug);
    pageModel.findOne({slug:req.params.slug},(err,pagedata)=>{
        // console.log(pagedata.description);
        if(err)
                {
                    return console.log(err);
                }

                console.log("done");
               
                res.render('admin/edit_page',{
                    title:pagedata.title,
                    slug:pagedata.slug,
                    description:pagedata.description,
                    id:pagedata._id

                });


    });

 
}
exports.reorderPage=(req,res)=>{
    // console.log("das");
    // console.log(req.body);
    var ids=req.body['id[]'];
    var count=0;
    for (let i = 0; i < ids.length; i++) {
        var id=ids[i];
        // console.log(id);
        count++;
        (function (count) {
            
        
        pageModel.findById(id,(err,page)=>{
            page.sorting=count;
            // console.log(page);
        
            page.save(function(err){
                console.log(count);
                if(err)
                {
                    return console.log(err);
                }
                console.log("done");
             
            });

        });
    })(count);
        
    }

}
exports.deletePage=(req,res)=>{
    pageModel.findByIdAndDelete(req.params.id,(err)=>{
        if(err)
        {
            return console.log(err);
        }
        console.log("done");
        req.flash('success',"Page Deleted");
        res.redirect('/admin/pages');

    })

}
exports.indexPage=(req,res)=>{
    var mysort = {sorting: 1 };
    pageModel.find().sort(mysort)
        .then((pages)=>{
            res.render('admin/pages',{
            pages:pages
        });
    })
    .catch(err=>console.log(err));


}

// exports.getPosts=(req,res)=>{
//     const posts=Postmodel.find().select("_id title body")
//     .then((posts)=>{
//         res.status(200).json({posts:posts});
//     })
//     .catch(err=>console.log(err));

//     // res.send("hello api from controller");
//     // res.json({
//     //     posts:[
//     //         {title:"first post"},
//     //         {title:"second post"}
//     //     ]
//     // })
// };
exports.createPage=(req,res)=>{
     
        var title=req.body.title;
        var slug=S(req.body.slug).replaceAll(' ', '-');
        var description=req.body.description;
        if (slug=="") {
            slug=S(title).replaceAll(' ', '-');
            
        }
        if(errors){ 
            console.log("errr");
        res.render('admin/add_page',{
            errors:errors,
            title:title,
            slug:slug,
            description:description
        });
        }
        else {
            console.log("else1");
            pageModel.findOne({slug:slug},function(err,page){
                if(page){
                    console.log("inside");
                    req.flash('danger','Page Already Exist Choose new');
                    res.render('admin/add_page',{
                        title:title,
                        slug:slug,
                        description:description
                    });
                }else{
                    var pagedata=new pageModel({
                        title:title,
                        slug:slug,
                        description:description,
                        sorting:100
                    });
                    pagedata.save(function(err){
                        if(err)
                        {
                            return console.log(err);
                        }
                        console.log("done");
                        req.flash('success',"Page added");
                        res.redirect('/admin/pages');
    
                    });
    
                }
    
            });
            // console.log("success");
        }
    
 
}
// post edit page
exports.editPagestore=(req,res)=>{
     
        var title=req.body.title;
        var slug=S(req.body.slug).replaceAll(' ', '-');
        var description=req.body.description;
        var id=req.body.id;
        if (slug=="") {
            slug=S(title).replaceAll(' ', '-');
            
        }
        if(errors){ 
            console.log("errr");
        res.render('admin/edit_page',{
            errors:errors,
            title:title,
            slug:slug,
            description:description,
            id:id
        });
        }
        else {
            console.log("else1");
            pageModel.findOne({slug:slug,_id:{'$ne':id}},function(err,page){
                if(page){
                    console.log("inside");
                    req.flash('danger','Page Already Exist Choose new');
                    res.render('admin/edit_page',{
                        title:title,
                        slug:slug,
                        description:description,
                        id:id
                    });
                }else{
                   pageModel.findById(id,(err,pagedata)=>{
                    if(err)
                    {
                        return console.log(err);
                    }
                    pagedata.title=title;
                    pagedata.slug=slug;
                    pagedata.description=description;
                    pagedata.save(function(err){
                        if(err)
                        {
                            return console.log(err);
                        }
                        console.log("done");
                        req.flash('success',"Page updated");
                        res.redirect('/admin/pages');
    
                    });

                   });
                   
    
                }
    
            });
            // console.log("success");
        }
    
 
}