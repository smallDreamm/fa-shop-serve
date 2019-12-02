const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
// const bodyParser = require('koa-bodyparser');
// router.use(bodyParser());

router.post('/searchThing',async(ctx)=>{
    const Product = mongoose.model('Product');
    var searchThing=ctx.request.body.searchThing;
    console.log(searchThing)
    await Product.find({name:{$regex:searchThing}}).exec().then(res=>{
        ctx.body=res
        console.log(res)
    })

})


module.exports = router;