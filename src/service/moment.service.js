const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?)";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async queryList(offset = 0, size = 10) {
    const statement = `SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? OFFSET ?;`;
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }

  async detailById(id) {
    const statement = `SELECT
        m.id id,
        m.content content,
        m.createAt createTime,
        m.updateAt updateTime,
        JSON_OBJECT( 'id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt ) user,
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
                          'user', JSON_OBJECT( 'id', cu.id, 'name', cu.name ) 
                         )
            )
          FROM comment c
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) comments,
        (
          JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name))
        ) labels
      FROM
        moment m
        LEFT JOIN USER u ON u.id = m.user_id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON ml.label_id = l.id
      WHERE
        m.id = ?
      GROUP BY
        m.id;`;
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

  async hasLabel(momentId, labelId) {
    const statement =
      "SELECT  * FROM moment_label WHERE moment_id = ? AND label_id = ?;";
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result[0];
  }

  async addLabel(momentId, labelId) {
    const statement =
      "INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
