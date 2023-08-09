const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body;

    // 2.获取用户id
    const { id } = ctx.user;

    // 3.将动态相关信息添加到数据库
    const result = await momentService.create(content, id);

    console.log(result);

    ctx.body = {
      code: 0,
      message: "创建用户动态成功～",
      data: result,
    };
  }
}

module.exports = new MomentController();
