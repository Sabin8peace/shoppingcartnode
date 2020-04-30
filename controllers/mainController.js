const pageModel=require('../models/page');
const categoryModel=require('../models/category');

function mainfunction(req,res){
    var mysort = {sorting: 1 };
    pageModel.find().sort(mysort)
        .then((pages)=>{
            return (pages);

    })
    
    .catch(err=>console.log(err));


}
function categorylistFunction(req,res){

    categoryModel.find()
    .then((pages)=>{
        return (pages);

})

.catch(err=>console.log(err));

}
