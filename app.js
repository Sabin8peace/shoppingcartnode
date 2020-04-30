const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const session=require('express-session');
const fileUpload=require('express-fileupload');
const expressValidator=require('express-validator');
let config=require('./config/database');
var S = require('string');

// connect to db 
// mongoose.connect(config.database,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     })

// .then(()=>{console.log("db Connected");});
// mongoose.connection.on("error",err=>{
//     console.log(`DB connection error:${err.message}`);
// });
mongoose.connect('mongodb+srv://sabin8peace:sabin3222@cluster0-ddswj.mongodb.net/test?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })

.then(()=>{console.log("db Connected");});
mongoose.connection.on("error",err=>{
    console.log(`DB connection error:${err.message}`);
});
// init app
const app=express();
// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// set public folder
app.use(express.static(path.join(__dirname,'public')));
app.locals.errors=null;
app.locals.imageFile=null;
// Express file upload middleware
app.use(fileUpload());

// body parser middleware

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
// express session middleware
//with the help of this and flash message is shown
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));

// express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    },
    customValidators:{
      isImage:function(value,filename){
        var extension=(path.extname(filename)).toLocaleLowerCase();
        switch(extension){
          case'.jpg':
                  return '.jpg';
          case'.jpeg':
              return '.jpeg';
          case'.png':
               return '.png';
          case'':
              return '.jpg';
          default:
              return false;    
          
        }
      }
    }
  }));
app.use(expressValidator());


//   express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// app.get('/',(req,res)=>{
//     // res.send("working");
//     res.render('index',{
//         title:"this is from ap.js",
//         body:"this is the body from uta"
//     });//since we have announced views folder to use above
//     });

// set routes 
const pages=require('./routes/pages.js');
const adminPages=require('./routes/admin_pages.js');
const adminCategories=require('./routes/admin_categories.js');
const adminProducts=require('./routes/admin_products.js');
app.use('/',pages); //this repesents the base url from frontend
app.use('/admin/pages',adminPages); // this represents the base url for admin template
app.use('/admin/categories',adminCategories); // this represents the base url for admin template
app.use('/admin/products',adminProducts); // this represents the base url for admin template

// start server
const port=3000;
app.listen(port,()=>{
    console.log("server is listining on ",port)
})