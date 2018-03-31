// 加载获取数据库数据的文件
const User = require("../model/user.js")
// 加载moment第三方模块
const moment = require("moment")
// 加载md5
const md5 = require("md5")


exports.showSignin = (req,res)=>{

	res.render("signin.html")

}

exports.dealSignin = (req,res)=>{
	// 1 使用body接收表单数据
	const body = req.body
	// 2 链接数据库 验证用户名和密码
	User.getByemail(body.email,(err,user) => {
		if(err){
			return res.send({
				code: 500,
				message: err.message
			})
		}

		// 基础校验
	// 	 // email, password
 // +  // Joi.validate(body, { // 基本数据校验
 // +  //   email: Joi.string().email(),
 // +  //   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
 // +  // }, (err, value) => {
 // +  //   if (err) { // 判断客户端发送的数据是否有错误
 // +  //     return res.send({
 // +  //       code: 400,
 // +  //       message: err.details
 // +  //     })
 // +  //   }
 // +
 // +  //   // 验证通过之后的处理
 // +  //   User.getByEmail(body.email, (err, user) => {
 // +  //     if (err) {
 // +  //       // return res.send({
 // +  //       //   code: 500,
 // +  //       //   message: err.message
 // +  //       // })
 // +  //       return next(err)
 // +  //     }

		
		// 业务校验
		// 校验用户名
		if(!user){
			return res.send({
				code: 1,
				message: "用户名不存在"
			})
		}
		// 用户名存在，校验密码
		if(user.password!=md5(body.password)){
			return res.send({
				code: 2,
				message: "密码不正确"
			})
		}

		// 用户和密码都正确，就保存在session中
		req.session.user = user
		// 用户名和密码都正确
		return res.send({
			code: 200,
			message: "success"
		})
		
	})
}

exports.showSignup = (req,res)=>{
	res.render("signup.html")

}

exports.dealSignup = (req,res)=>{

	// 1 接收提交的数据
	const body = req.body
	// 2 表单验证
	// 验证邮箱是否被占用
	User.getByemail([body.email],(err, user)=> {
	 if(err){
	 	// \让用户知道出了什么错误
	 	return res.send({
	 		code: 500,
	 		message: err.message//把错误的信息发送给用户
	 	})
	 }

	  // console.log(results) []
	 // 没有错误，那么就要判断邮箱是否被占用
	 if(user){
	 	// 打印出来发现，results是一个数组，如果数组中有数据，说明已经存在
	 	return res.send({
	 		code: 1,
	 		message: "邮箱已经被占用"
	 	})
	 }

	 // 如果邮箱没有被占用，检测昵称是否被占用
	 // 校验昵称是否存在
		User.getBynickname([body.nickname],(err,user)=>{
			if(err){
				return res.send({
					code: 500,
					message: err.message
				})
			}
			if(user){
				return res.send({
					code: 2,
					message: "昵称被占用"

			})
		}
		})

		
		// 如果昵称与邮箱都没有被占用，那么就将数据写入数据库
		// 添加更新时间  moment是专门更新时间的
		body.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
		body.password = md5(body.password)
		// 3 写入数据库
		User.addUser(body,(err,user) => {
			if(err){
				return res.send({
					code: 500,
					message: err.message
				})
			}
			// console.log(ret)
			// 通过打印ret发现，提示添加数据成功
			res.send({
				code: 200,
				message: "ok"
			})
		})
	   
	})


	
	// 4 给前端返回数据
}

exports.dealSignout = (req,res)=>{
	// res.send("/sigout")
	// 1 清除session
	delete req.session.user
	// 2 因为是同步的，所以可以使用重定向
	res.redirect("/signin")
}
