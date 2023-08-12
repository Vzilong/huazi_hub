const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");
const verifyLabelExists = require("../middleware/label.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 1.增：发表动态
momentRouter.post("/", verifyAuth, create);

// 2.查：获取动态列表
momentRouter.get("/", list);

// 获取某条动态详情
momentRouter.get("/:momentId", detail);

// 3.改：修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 4.删：删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 5.给moment添加标签
/**
 * 中间件
 *   1.是否登录
 *   2.验证是否有操作这个动态的权限
 *   3.验证label的name是否在label表中已经存在
 *     如果存在，直接使用
 *     如果不存在，先将label的name添加到label表中
 *   4.最后
 *     所有的label都在label表中
 *     动态2和对应的labels添加到关系表中
 */
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
