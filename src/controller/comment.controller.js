const { create, reply } = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;

    const result = await create(content, momentId, id);

    ctx.body = {
      code: 0,
      message: "评论成功～",
      data: result,
    };
  }

  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;

    const result = await reply(content, momentId, commentId, id);

    ctx.body = {
      code: 0,
      message: "回复评论成功～",
      data: result,
    };
  }
}

module.exports = new CommentController();
