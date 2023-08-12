const fs = require("fs");
const userService = require("../service/user.service");
const { UPLOADS_PATH } = require("../config/path");
const { queryAvatarByUserId } = require("../service/file.service");

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body;

    // 2.将user信息存储到数据库中
    const result = await userService.create(user);

    // 3.查看存储的结果，告知前端创建成果
    ctx.body = {
      message: "创建用户成功～",
      data: result,
    };
  }

  async showAvatar(ctx, next) {
    const { userId } = ctx.params;

    const result = await queryAvatarByUserId(userId);

    const { filename, mimetype } = result;

    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOADS_PATH}/${filename}`);
  }
}

module.exports = new UserController();
