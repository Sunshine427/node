// 1 加载模块
const express = require("express")
const index = require("./controllers/index.js")
const topic = require("./controllers/topic.js")
const user = require("./controllers/user.js")

// 2 调用express的方法，创建一个实例
const router = express.Router()


// 3 制作router规则
	// 首页路由
router
	.get("/",index.showIndex)
	// 用户路由
router
	.get("/signin",user.showSignin)
	.post("/signin",user.dealSignin)
	.get("/signup",user.showSignup)
	.post("/signup",user.dealSignup)
	.get("/signout",user.dealSignout)
	// 话题
router
	.get("/topic/create",topic.showTopic)
	.post("/topic/create",topic.dealTopic)
	.get("/topic/:topicID",topic.detail)
	.get("/topic/:topicID/edit",topic.showEdit)
	.post("/topic/:topicID/edit",topic.edit)
	.get("/topic/:topicID/delete",topic.dele) 


// 4 导出router
module.exports = router
// 5 在app中使用router
