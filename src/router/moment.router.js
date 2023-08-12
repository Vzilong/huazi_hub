const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/moment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");

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

module.exports = momentRouter;
