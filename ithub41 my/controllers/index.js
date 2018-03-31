// 从数据库获取数据  显示在页面上
const topic = require("../model/topic")


	// 没有错误就渲染
exports.showIndex = (req,res,next)=>{
	topic.fullData((err,topics) => {
	if(err){
		return next(err)
	}
	// console.log(topics)
	res.render("index.html",{
		user: req.session.user,
		topics
		}
	)
	
	}
	)

	
}


