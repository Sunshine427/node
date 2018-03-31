// 此文件只用来处理话题中的从数据库获取数据
const mysql = require("mysql")
const dp = require("../dp-help/dp.js")
exports.fullData = (callback) => {
	const sql = "SELECT * FROM `topics`"
	dp.query(sql,(err,ret) => {
		if(err){
			return callback(err)
		}

		return callback(null,ret)
	})
}

exports.getByEmail = (title,callback) => {
	const sql = "SELECT * FORM `topics` WHERE `title`=?"
	dp.query(sql,[title],(err,ret) => {
		if(err){
			console.log(err);
			return callback(err)
		}
		return callback(null,ret)
	})
}

exports.addTopic = (obj,callback) => {
	const sql = "INSERT INTO `topics` SET ?"
	dp.query(sql,obj,(err,ret) => {
		if(err){
			return callback(err)
		}
		return callback(null,ret)
	})
}

exports.delete = (id,callback) => {
	const sql = "DELETE FROM `topics` where `id`=?"
	dp.query(sql,[id],(err,ret) => {
		if(err){
			return callback(err)
		}
		return callback(null,ret)
	})
}

exports.update = (obj,callback) => {
	const sql = "UPDATE `topics` SET `title`=?,`content`=? where `id`=?"
	dp.query(sql,[
		obj.title,
		obj.content,
		obj.id
		],(err,ret) => {
			if(err){
				return callback(err)
			}

			callback(null,ret)
		})
}

exports.getByid = (id,callback) => {
	const sql = "SELECT * FROM `topics` where `id`=?"
	dp.query(sql,[id],(err,ret) => {
		if(err){
			return callback(err)
		}

		return callback(null,ret[0])
	})
}