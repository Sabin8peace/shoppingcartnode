const mongoose=require('mongoose');
const PageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    slug:{
        type:String,

    },
    description:{
        type:String,
        required:true

    },
    sorting:{
        type:Number

    }
});
// module.exports=mongoose.model("Post",postSchema);
module.exports=mongoose.model('Pages',PageSchema)
