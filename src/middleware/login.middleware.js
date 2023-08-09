const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const { PUBLIC_KEY } = require("../config/screct");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2.查询用户名在数据库中是否已存在
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  // 3.查询用户传递的密码和数据库中的密码是否一致
  if (md5password(password) !== user.password) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }

  // 4.将user信息保存在ctx里面
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token是否有效
  try {
    // 2.1获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    // 2.2将user信息保存
    ctx.user = result;

    // 2.3执行下一个中间件
    await next();
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
