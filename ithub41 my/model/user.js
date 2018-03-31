// 此文件只用来封装用户中的从数据库获取数据
// ========用户注册
// 注意：只将sql语句以及connection.query封装，错误或者获取的数据要给用户处理
// 将数据库共用样式 加载进来
const dp = require(("../dp-help/dp"))

exports.getByemail = (email,callback) => {
	const sql = "SELECT * FROM `users` where `email`=?"
	dp.query(sql,[email],(err, ret)=> {
		if(err){
			return callback(err)
		}
		callback(null,ret[0])
	})
}

exports.getBynickname = (nickname,callback) => {
	const sqlStr = "SELECT * FROM `users` WHERE `nickname`=?"
		dp.query(sqlStr,[nickname],(err,ret)=>{
			if(err){
				return callback(err)
			}
			
			return callback(null,ret[0])
			
	})
}

exports.addUser = (obj,callback) => {
	const sqlWrite = "INSERT INTO `users` set ?"
	dp.query(sqlWrite,obj,(err,ret) => {
		if(err){
			return callback(err)
		}

		return callback(null,ret)
	})
}
