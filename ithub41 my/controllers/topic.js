const topic = require("../model/topic.js")
const moment = require("moment")
const marked = require("marked")

exports.showTopic = (req,res,next) => {

	res.render("topic/create.html")
}

exports.dealTopic = (req,res,next) => {
	// 接收提交的数据
	// console.log(req.body)
	const body = req.body
	body.userId = req.session.user.id
	body.createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
	console.log(body)
	// 操作数据库
	topic.addTopic(body,(err,ret) => {
		if(err){
			return res.send({
				code: 500,
				message: err.message
			})
		}
		res.send({
			code: 200,
			message: "添加成功"
		})
	})
}


exports.detail = (req,res,next) => {
	const {topicID} = req.params
	topic.getByid(topicID,(err,topic) => {
		if(err){
			return next(err)
		}
				// 使用marked将md格式的文件转换为html文件
		topic.content = marked(topic.content)
		res.render("topic/show.html",{
			topic
		})
	})
}

exports.showEdit = (req,res,next) => {
	// 从params中获取要编辑的内容的id
	const {topicID} = req.params

	topic.getByid(topicID,(err,topic) => {
		if(err){
			return next(err)
		}

		res.render("topic/edit.html",{
			topic
		})

	})
}
	

exports.edit = (req,res,next) => {
	const body = req.body
	console.log(body)
	topic.update(body,(err,topic) => {
		if(err){
			return next(err)
		}
		res.send({
			code: 200,
			message: "更新成功"
		})
	})
}

exports.dele = (req,res,next) => {
	const {topicID} = req.params
	topic.delete(topicID,(err,ret) => {
		if(err){
			return next(err)
		}
		res.send({
			code: 200,
			message: "删除成功"
		})
	})
}