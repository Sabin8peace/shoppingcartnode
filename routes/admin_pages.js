const express=require('express');

const {createPage,editPagestore,deletePage,editPage,indexPage,reorderPage}=require('../controllers/post');
const router=express.Router();
const validator=require('../validator');
var pageModel=require('../models/page');

// get pages index
// router.get('/',(req,res)=>{
//     res.send("admin area");
  
// });
router.get('/',indexPage);

router.post('/reorder-page',reorderPage);
router.get('/delete-page/:id',deletePage);
router.get('/edit-page/:slug',editPage);
// get add Page
router.get('/add-page',function(req,res){
    var title="";
    var slug="";
    var description="";
    res.render('admin/add_page',{
        title:title,
        slug:slug,
        description:description
    });
  
});
//post add page
router.post('/add-page',validator.createPageValitor,createPage);
router.post('/edit-page/:slug',validator.createPageValitor,editPagestore);

// router.post('/add-page',function(req,res){
//     req.check('title',"write title here").notEmpty();
//     req.check('description','description must have a value').notEmpty();
//     // console.log(req.body);
//     var title=req.body.title;
//     var slug=req.body.slug;
//     var description=req.body.description;
//     if (slug=="") {
//         slug=title;
        
//     }
//     var errors=req.validationErrors();
//     if(errors){ 
//         console.log("errr");
//     res.render('admin/add_page',{
//         errors:errors,
//         title:title,
//         slug:slug,
//         description:description
//     });
//     }
//     else {
//         console.log("else1");
//         pageModel.findOne({slug:slug},function(err,page){
//             if(page){
//                 console.log("inside");
//                 req.flash('danger','PAge Already Exist Choose new');
//                 res.render('admin/add_page',{
//                     title:title,
//                     slug:slug,
//                     description:description
//                 });
//             }else{
//                 var pagedata=new pageModel({
//                     title:title,
//                     slug:slug,
//                     description:description,
//                     sorting:0,
//                 });
//                 console.log(pagedata);
//                 pagedata.save(function(err){
//                     if(err)
//                     {
//                         return console.log(err);
//                     }
//                     console.log("done");
//                     req.flash('success',"PAge added");
//                     res.redirect('/admin/pages');

//                 });

//             }

//         });
//         // console.log("success");
//     }


// });
router.get('/tests',(req,res)=>{
    res.send("admin test page");
    // http://localhost:8000/admin/pages/tests will show this page

});
module.exports=router;