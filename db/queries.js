const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function getUserByID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE userid = $1", [id]);
  return rows[0];
}

async function addNewUser(username, hashedPassword) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
}

async function addNewMessage(userid, message, title) {
  await pool.query("INSERT INTO messages (message, title, userid) VALUES ($1, $2, $3)", [
    message,
    title,
    userid
  ]);
}

async function updateUserMembership(userid) {
  await pool.query("UPDATE users SET member = TRUE WHERE userid = $1", [userid]);
}


module.exports = {
    getUserByUsername,
    getUserByID,
    addNewUser,
    addNewMessage,
    updateUserMembership
}