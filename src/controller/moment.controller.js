const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body;

    // 2.获取用户id
    const { id } = ctx.user;

    // 3.将动态相关信息添加到数据库
    const result = await momentService.create(content, id);

    ctx.body = {
      code: 0,
      message: "创建用户动态成功～",
      data: result,
    };
  }

  async list(ctx, next) {
    // 获取分页参数
    const { offset, size } = ctx.query;

    // 从数据库获取moment列表数据
    const result = await momentService.queryList(offset, size);

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.detailById(momentId);

    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;

    const { content } = ctx.request.body;

    const result = await momentService.updateById(content, momentId);

    ctx.body = {
      code: 0,
      message: "修改动态成功～",
      data: result,
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.removeById(momentId);

    ctx.body = {
      code: 0,
      message: "删除动态成功～",
      data: result,
    };
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    console.log(labels, momentId);

    // 将moment_id和label_id添加到moment_label表中
    try {
      for (const label of labels) {
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (isExists) continue;
        const result = await momentService.addLabel(momentId, label.id);

        ctx.body = {
          code: 0,
          message: "给动态添加标签成功",
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: "添加失败",
      };
    }
  }
}

module.exports = new MomentController();
