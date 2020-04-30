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