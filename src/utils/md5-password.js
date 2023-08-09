const crypto = require("crypto");

function md5password(password) {
  // md5使用哈希算法进行加密
  const md5 = crypto.createHash("md5");

  // 加密结果默认为2进制，转化为16进制
  const md5pwd = md5.update(password).digest("hex");

  return md5pwd;
}

module.exports = md5password;
