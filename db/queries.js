const pool = require("./pool");

async function getUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
  }

async function getUserByID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE userID = $1", [id]);
  return rows[0];
}


async function addNewUser(username, hashedPassword) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
}

module.exports = {
    getUserByUsername,
    getUserByID,
    addNewUser,
}