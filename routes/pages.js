const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    // res.send("working");
    res.render('index',{
        title:"this is from ap.js",
        body:"this is the body from uta"
    });//since we have announced views folder to use above
    // else we need
    // res.render('/views/index'); //something like this i guess
});
router.get('/tests',(req,res)=>{
    res.send("front test page");
    // http://localhost:8000/tests will show this page


});
module.exports=router;