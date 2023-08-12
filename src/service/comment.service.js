const connection = require("../app/database");

class CommentService {
  async create(content, momentId, id) {
    const statement =
      "INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);";
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      id,
    ]);
    return result;
  }

  async reply(content, momentId, commentId, id) {
    const statement =
      "INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);";
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      id,
      commentId,
    ]);
    return result;
  }
}

module.exports = new CommentService();
