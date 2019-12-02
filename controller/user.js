const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

// var responseData;
// router.use(function (req,res,next) {
//     responseData={
//         code:0,
//     }
//     next();
// })
//
// router.post('/registUser',function (req,res,next) {
//     const User = mongoose.model('User');
//     let newUser = new User(req.body);
//     var userName=newUser.userName;
//     var password=newUser.password;
//     console.log(userName);
//     console.log(password);
//
//     User.findOne({userName:userName}).then(function (userInfo) {
//         if ( userInfo ) {
//             //表示数据库中有该记录
//             res.body.code=401
//             return;
//         }
//         var user = new User({
//             userName: userName,
//             password: password
//         });
//         return user.save();
//     }).then(function (newUserInfo) {
//         console.log(newUserInfo)
//         res.body.code = 200;
//         // responseData.message = 'zhucechengg ';
//         res.json(responseData);
//     })
//
// })
router.post('/registUser', async (ctx) => {
    // 获取model
    const User = mongoose.model('User');
    // 接收post请求封装成user对象
    let newUser = new User(ctx.request.body);
    var userName=newUser.userName;
    var password=newUser.password;
    // 使用save保存用户信息
    await User.findOne({userName:userName}).then(function (userInfo) {
            if(userInfo){
                ctx.body = {
                    code: 401,
                    message: '手机号已被注册'
                };
                return;
            }

        var newnewUser=new User({
            userName:userName,
            password:password
        });
        return newnewUser.save()
            // .then((ctx)=>{
            //     ctx.body={
            //         code:200,
            //         message:'注册成功'
            //     }
            // });
        // return ctx.body.code=200
    })
    //     .then((ctx)=>{
    //         ctx.response.body={
    //             code:200,
    //             message:'注册成功'
    //         }
    //
    //
    // })

});

// router.post('/registUser', async (ctx) => {
//     // 获取model
//     const User = mongoose.model('User');
//     // 接收post请求封装成user对象
//     let newUser = new User(ctx.request.body);
//     // 使用save保存用户信息
//     await newUser.save().then(() => {
//         ctx.body = {
//             code: 200,
//             message: '注册成功'
//         };
//     }).catch(err => {
//         ctx.body = {
//             code: 500,
//             message: err
//         };
//     });
// });


router.post('/loginUser', async (ctx) => {
    // 接收前端发送的数据

    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    // 引入model
    const User = mongoose.model('User');
    // 查询用户名是否存在 存在再去比较密码
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        // console.log("jinlaile");
        if (result) {
            let newUser = new User();
            await newUser.comparePassword(password, result.password)
                .then(isMatch => {
                    // 登录成功
                    if (isMatch) {
                        // console.log("chenggong");
                        ctx.body = {
                            code: 200,
                            message: '登录成功',
                            userInfo: result
                        };

                    } else {// 登录失败
                        console.log("shibai");
                        ctx.body = {
                            code: 201,
                            message: '登录失败'
                        };
                    }
                })

        } else {
            ctx.body = {
                code: 201,
                message: '用户名不存在'
            };
        }
    })

});

module.exports = router;