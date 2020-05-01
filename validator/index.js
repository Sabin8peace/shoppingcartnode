exports.userLoginValitor=(req,res,next)=>{
    req.check('username',"username is required").notEmpty();
    req.check('password',"Password is required").notEmpty();
    var errorstmp=req.validationErrors();
    if(errorstmp){ 
        errors=errorstmp;
    }
    else
    {
        errors=null;
    }
    
    next();

}
exports.createUserValitor=(req,res,next)=>{
    req.check('name',"Name Is Required").notEmpty();
    req.check('email','email is required').isLength({
        max:130
    });
    req.check('username',"username is required").notEmpty();
    req.check('password',"Password is required").notEmpty();
    req.check('password2',"Password not match").equals(req.body.password);
    
    var errorstmp=req.validationErrors();
    if(errorstmp){ 
        errors=errorstmp;
    }
    else
    {
        errors=null;
    }
    
    next();
}
exports.createPageValitor=(req,res,next)=>{
    req.check('title',"write title here").notEmpty();
    req.check('title','title must be long').isLength({
        max:130
    });
    req.check('description',"write body here").notEmpty();
    req.check('description','body must be long').isLength({
        max:2000
    });
   
    var errorstmp=req.validationErrors();
    if(errorstmp){ 
        errors=errorstmp;
    }
    else
    {
        errors=null;
    }
    
    next();
}
exports.categoryValidator=(req,res,next)=>{
    req.check('title',"write title here").notEmpty();
    req.check('title','title must be long').isLength({
        max:130
    });   
    var errorstmp=req.validationErrors();
    if(errorstmp){ 
        errors=errorstmp;
    }
    else
    {
        errors=null;
    }
    
    next();
}
exports.productValidator=(req,res,next)=>{
    if(!req.files){ imageFile =""; }
    if(req.files){
     imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : "";
    }
     req.check('title',"write title here").notEmpty();
     req.check('description',"write body here").notEmpty();
     req.check('price',"Price is needed").isDecimal();
     req.check('image',"You must upload image").isImage(imageFile);
    var errorstmp=req.validationErrors();
    if(errorstmp){ 
        errors=errorstmp;
    }
    else
    {
        errors=null;
    }
    
    next();
}