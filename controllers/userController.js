const express=require('express');

var passport=require('passport');
var bcrypt=require('bcryptjs');
var userModel=require('../models/user');
exports.storeFunction=(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var username=req.body.username;
    var password=req.body.password;
    // console.log(req.body);
    if(errors){ 
        console.log("err");
    res.render('front/register',{
        errors:errors,
        user:null,
        name:name,
        email:email,
        username:username,
        title:'Register'
    });
    }
    else{
        userModel.findOne({username:username},(err,user)=>{
            if (err) {
                console.log(err);
                
            }
            if (user) {
                req.flash('danger','username Exists,Choose Another');
                // res.redirect('/user/register');
                res.render('front/register',{
                    name:name,
                    email:email,
                    username:username,
                    title:'Register'
                });
                
            }
            else{
                var user=new userModel({
                    name:name,
                    email:email,
                    username:username,
                    password:password,
                    admin:0
                });
                // conso le.log(user);
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(user.password,salt,(err,hash)=>{
                        if (err) {
                            console.log(err);
                            
                        }
                        user.password=hash;
                        user.save((err)=>{
                            if (err) {
                                console.log(err);
                                
                            }
                            else{
                                req.flash('success','username Registered');
                                res.redirect('/user/login');

                            }

                        });
                    });

                });

            }

        })
    }

    

}

exports.loginFunctionPost=(req,res,next)=>{
    // var username=req.body.username;
    // var password=req.body.password;
    // if(errors){ 
    //     console.log("err");
    // res.render('front/login',{
    //     errors:errors,
    //     username:username,
    //     title:'Login',
    // });
    // }
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/user/login',
        failureFlash:true
    })(req,res,next);



}

exports.createFunction=(req,res)=>{
    res.render('front/register',{
        title:"Register",
        name:"",
        email:"",
        username:""
    });

};