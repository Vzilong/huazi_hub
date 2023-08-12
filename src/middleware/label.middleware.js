const { queryLabelByName, create } = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body;

  const newLabels = [];
  // 判断labels中的label是否都已存在
  for (const name of labels) {
    const result = await queryLabelByName(name);
    const labelObj = { name };
    if (result) {
      // 将查出来的label_id添加到labelObj中
      labelObj.id = result.id;
    } else {
      // 不存在 将name添加到label表中，再把添加的insertId添加到labelObj中
      const insertResult = await create(name);
      labelObj.id = insertResult.insertId;
    }
    newLabels.push(labelObj);
  }

  ctx.labels = newLabels;

  await next();
};

module.exports = verifyLabelExists;
