const fs = require("fs");

function registerRouters(app) {
  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    // 不是以.router.js结尾的，continue执行下一次循环
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);

    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = registerRouters;
