const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?)";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async queryList(offset = 0, size = 10) {
    const statement =
      "SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user FROM moment m LEFT JOIN user u ON u.id = m.user_id LIMIT ? OFFSET ?;";
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }

  async detailById(id) {
    const statement =
      "SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user FROM moment m LEFT JOIN user u ON u.id = m.user_id WHERE m.id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async updateById(content, id) {
    const statement = "UPDATE moment SET content = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }

  async removeById(id) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new MomentService();
