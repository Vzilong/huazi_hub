const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");

class LoginController {
  sign(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user;

    // 2.生成token，颁发令牌，传入token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });

    // 3.返回用户登录信息
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };
  }
}

module.exports = new LoginController();
