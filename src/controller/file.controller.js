const { SERVER_HOST, SERVER_PORT } = require("../config/server");
const { create } = require("../service/file.service");
const { updateUserAvatar } = require("../service/user.service");

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;

    // 保存图片信息
    const result = await create(filename, mimetype, size, id);

    // 将头像的地址信息保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    await updateUserAvatar(avatarUrl, id);

    ctx.body = {
      code: 0,
      message: "上传成功~",
      data: result,
    };
  }
}

module.exports = new FileController();
