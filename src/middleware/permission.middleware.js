const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const { checkResouce } = require("../service/permission.service");

const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user;

  // 获取动态params的参数key和value
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  // 查询是否有修改moment的权限
  const isPermission = await checkResouce(resourceId, resourceName, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  await next();
};

module.exports = {
  verifyPermission,
};
