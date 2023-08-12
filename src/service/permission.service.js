const connection = require("../app/database");

class PermissionService {
  async checkResouce(resourceId, resourceName, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [resourceId, userId]);
    return !!result.length;
  }
}

module.exports = new PermissionService();
