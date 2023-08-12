const multer = require("@koa/multer");
const { UPLOADS_PATH } = require("../config/path");

// 上传头像的中间件
const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, UPLOADS_PATH);
    },
    filename(req, file, callback) {
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
  // dest: "./uploads",
});

const handleAvatar = uploadAvatar.single("avatar");

module.exports = handleAvatar;
