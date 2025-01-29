const pool = require("./pool");

const getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

const getUserByID = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE userid = $1", [id]);
  return rows[0];
}

const addNewUser = async (username, hashedPassword) => {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
}

const addNewMessage = async (userid, message, title) => {
  await pool.query("INSERT INTO messages (message, title, userid) VALUES ($1, $2, $3)", [
    message,
    title,
    userid
  ]);
}

const updateUserMembership = async (userid) => {
  await pool.query("UPDATE users SET member = TRUE WHERE userid = $1", [userid]);
}

const getAllMessages = async () => {
  const { rows } = await pool.query(`SELECT messages.message, messages.title, messages.messagetimestamp, users.username
                                     FROM messages 
                                     INNER JOIN users ON messages.userid = users.userid
                                     ORDER BY messages.messagetimestamp`);
  return rows;
}


module.exports = {
    getUserByUsername,
    getUserByID,
    addNewUser,
    addNewMessage,
    updateUserMembership,
    getAllMessages
}