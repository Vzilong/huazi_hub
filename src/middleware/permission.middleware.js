const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const { checkMoment } = require("../service/permission.service");

const verifyMomentPermission = async (ctx, next) => {
  const { momentId } = ctx.params;
  const { id } = ctx.user;

  // 查询是否有修改moment的权限
  const isPermission = await checkMoment(momentId, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  await next();
};

module.exports = {
  verifyMomentPermission,
};
