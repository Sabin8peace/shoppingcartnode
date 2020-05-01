const express=require('express');
var passport=require('passport');
var bcrypt=require('bcryptjs');
var userModel=require('../models/user');
const router=express.Router();
const {createUserValitor,userLoginValitor}=require('../validator');
const {createFunction,storeFunction,loginFunctionPost}=require('../controllers/userController');
router.get('/register',createFunction);
router.post('/register',createUserValitor,storeFunction);
router.post('/login',loginFunctionPost);
// router.post('/login',(req,res,next)=>{
    
//     passport.authenticate('local',{
//         successRedirect:'/',
//         failureRedirect:'/user/login',
//         failureFlash:true
//     })(req,res,next);


// });
router.get('/login',(req,res)=>{
     if (res.locals.user) {
         res.redirect('/');   
     }
     res.render('front/login',{
        title:"Login",
        username:""
    });

});
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','Logged Out!! Thank you For Visiting');
    res.redirect('/user/login');


  
});


// router.get('/register',(req,res)=>{
//     res.render('front/register',{
//         title:"Register",
//         name:"",
//         email:"",
//         username:""
//     });
// });
// router.post('/register',(req,res)=>{
//     var name=req.post.name;
//     var email=req.post.email;
//     var username=req.post.username;
//     var password=req.post.password;
//     var password2=req.post.password2;
    
//     res.render('front/register',{
//         title:"Register",
//         name:"",
//         email:"",
//         username:""
//     });
// });

module.exports=router;