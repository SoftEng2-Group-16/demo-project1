const crypto = require('crypto');

const db = require('./db');
const { Service, Counter, Ticket } = require("./model");
const { check } = require('express-validator');

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


exports.getUser = (username, password) => { // this is used by passport see line 32 in index.js
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



//API SECTION

exports.getServices = (type) => {
  return new Promise((resolve, reject) => {
    let sql="";
    if(type){
      sql="SELECT * FROM services WHERE type=?"
    }
    else{
      sql="SELECT * FROM services"
    }
    db.all(sql, [type], (err, rows) => {
      console.log(rows);
      if (err) { reject(err); }
      //if not find anything
      if (rows.length == 0) {
        resolve({ error: 'services not found' });
      }
      else {
        const services = rows.map((row) => new Service(row.id, row.type, row.description, row.service_time)); 
        resolve(services);
      }
    });
  });
};

exports.getServicesForCounter = (counterId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM counters WHERE id=?";
    db.get(sql, [counterId], (err, row) => {
      if(err) { reject(err); }
      if(row==null){
        resolve({error: `Problem while retrieving services for counterID ${counterId}`});
      }
      else {
        resolve(row.services.split(','));
      }
    });
  });
}

exports.getTicketsForService = (serviceType) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tickets WHERE service_type=? AND status!=?";
    db.all(sql, [serviceType,"closed"], (err,rows) => {
      if(err) { reject(err); }
      if(rows.length == 0) {
        resolve({error: `Problem while retrieving queue for service ${serviceType}`});
      } else {
        const tickets = rows.map( (row) =>
          new Ticket(
          row.id,
          row.counterid,
          row.timestamp_created,
          row.timestamp_finished,
          row.service_type,
          row.employeeid,
          row.status,
        ));
        resolve(tickets);
      }
    })
  })
}

exports.getServiceTime = (serviceType) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT service_time FROM services WHERE type=?";
    db.get(sql, [serviceType], (err, row) => {
      if(err) { reject(err); }
      else {
        resolve(row.service_time);
      }
    });
  });
}

exports.createTicket = (serviceType,ts,status) => {
  return new Promise((resolve, reject) => {
    const sql ="INSERT INTO tickets (counterid, timestamp_created, timestamp_finished, service_type, employeeid, status) values (?,?,?,?,?,?)";

    db.run(sql, [null,ts,null,serviceType,null,status], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}

exports.closeTicket= (ticketId,ts) => {
  return new Promise((resolve,reject) => {
    const sql="UPDATE tickets SET status=?, timestamp_finished=? WHERE id=?"

    db.run(sql,["closed",ts,ticketId], function(err) {
      if(err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

exports.assignTicket = (ticketId, employeeId, counterId) => {
  return new Promise((resolve,reject) => {
    const sql="UPDATE tickets SET employeeid=?, counterid=?, status=? WHERE id=?";
    db.run(sql,[employeeId, counterId, "pending", ticketId], function(err) {
      if(err) { reject(err)}
      else{
        resolve(this.changes);
      }
    });
  });
}

exports.getServicingTickets = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tickets WHERE status=? ORDER BY counterid";
    db.all(sql, ["pending"], (err,rows) => {
      console.log("ciao");
      if(err) { reject(err); }
      if(rows.length == 0) {
        resolve({error: `Problem while retrieving pending tickets`});
      } else {
        const tickets = rows.map( (row) =>
          new Ticket(
          row.id,
          row.counterid,
          row.timestamp_created,
          row.timestamp_finished,
          row.service_type,
          row.employeeid,
          row.status,
        ));
        resolve(tickets);
      }
    })
  })
}

exports.deleteTicket = (ticketId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tickets where id=?' ;  
    db.run(sql, [ticketId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);  // return the number of affected rows
    });
  });
}




