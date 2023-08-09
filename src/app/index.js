const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router");

const app = new Koa();

app.use(bodyParser());

// 注册所有路由
registerRouters(app);

module.exports = app;
