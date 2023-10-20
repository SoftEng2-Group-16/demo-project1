const crypto = require('crypto');

const db = require('./db');

//all the code here needs to be modified according to the new db

/**
 * Query the database and check whether the username exists and the password
 * hashes to the correct value.
 * If so, return an object with full user information.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise} a Promise that resolves to the full information about the current user, if the password matches
 * @throws the Promise rejects if any errors are encountered
 */

// USER SECTION


exports.getUser= (username, password) => { // this is used by passport see line 32 in index.js
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (!row) {
          reject('Invalid username or password');
        } else {
          const salt = row.salt;
          const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');

          if (hashedPassword === row.password) {
            console.log(row)
            resolve(row);
          } else {
            reject('Invalid username or password');
          }
        }
      }
    });
  });
}

// FOR SINGLE FETCH

exports.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE username = ?`;
      db.get(query, [username], (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
}

// FOR SINGLE FETCH

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT username FROM users';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  