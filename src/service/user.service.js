const connection = require("../app/database");

class UserService {
  async create(user) {
    // 1.获取用户 user
    const { name, password } = user;
    // 2.拼接statement
    const statement = "INSERT INTO `user` (name, password) VALUES (?, ?);";

    // 3.执行sql
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE name = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new UserService();
