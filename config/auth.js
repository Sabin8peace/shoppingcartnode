exports.isUser=function(req,res,next){
    if (req.isAuthenticated()) {
        next();
        
    }else{
        req.flash('danger','please Log in.');
        res.redirect('/user/login');
    }
}
exports.isAdmin=function(req,res,next){
    if (req.isAuthenticated() && res.locals.user.admin==1) {
        next();
        
    }else{
        req.flash('danger','please Log in as admin.');
        res.redirect('/user/login');


    }
}