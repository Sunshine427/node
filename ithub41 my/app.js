//  加载模块
const express = require("express")
const router = require("./router.js")
const bodyParser = require("body-parser")
const session = require("express-session")
// 因为sesion在浏览器关闭的时候会消失，所以用下面的插件将session永久存储
const MySQLStore = require('express-mysql-session')(session)

const app = express()

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ithub'
}
const sessionStore = new MySQLStore(options)

// 只有配置了下面的，req中才有session
app.use(session({
  key: 'session_cookie_name',	
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))

// art-template模板
app.engine('html', require('express-art-template'))

// 公开静态资源
app.use("/node_modules",express.static("./node_modules/"))
app.use("/public",express.static("./public/"))

// body-parser的配置
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app中有个local对象，可以在模板中之间使用，将共用的存在这个对象中
// 将session中存储的用户信息，保存到locals对象中
app.use((req,res,next) => {
  app.locals.sessionUser = req.session.user
  next()
})
// 将路由引入
app.use(router)

// 配置错误处理中间件
app.use((err,req,res,next) => {
    res.send({
      code: 500,
      message: err.message
    })
})

app.listen(8080,()=>{
	console.log("running....")
})