var localStrategy=require('passport-local').Strategy;
var User=require('../models/user');
var bcrypt=require('bcryptjs');
module.exports=function(passport){
    passport.use(new localStrategy((username,password,done)=>{
        User.findOne({username:username},(err,user)=>{
            if (err) {
                console.log(err);
            }
            if (!user) {
                return done(null,false,{message:'No user Found!'});
                
            }
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if (err) {
                    console.log(err);
                }
                if (isMatch) {
                    return done(null,user);
                }
                else{
                    return done(null,false,{message:'Wrong Password'});
                }

            });

        });

    }));
    passport.serializeUser((user,done)=>{
        done(null,user.id);

    });
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);

        });
      

    });

}