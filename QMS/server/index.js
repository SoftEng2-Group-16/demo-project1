'use strict';

const express = require('express');

// init express
const app = new express();
const port = 3001;

const morgan = require('morgan');
const cors = require('cors');
const dao = require('./dao');

const { check, validationResult, } = require('express-validator'); // validation middleware

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    const userDAO = await dao.getUser(username, password);
    const user = { id: userDAO.id, username: userDAO.username }
    console.log(user)
    if (!user)
      return cb(null, false, 'Incorrect username or password.');

    return cb(null, user);
  } catch {
    return cb(null, false, 'Incorrect username or password.');
  }
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user all the data found in the select user in the db, needs to be cleaned up
  console.log(user)
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));


// loggedin middleware


const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}

// SESSION ROUTES

// POST /api/sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).send(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      return res.status(201).json(req.user);
    });
  })(req, res, next);
});


// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/session/current
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
  req.logout(() => {
    res.sendStatus(204);
  });
});


/*** Utility Functions ***/
// This function is used to format express-validator errors as strings
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};




/***
 * Customer APIs
 */

//GET /api/services
app.get("/api/services", async (req, res) => {
  try {
    const services = await dao.getServices();
    if (services.error) {
      return res.status(404).json(services);  //{ error: 'No plane found'})
    }
    else
      return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});



//Customer choose a service type-> create new ticket
//POST /api/ticket
app.post('/api/ticket',
  [
    check("serviceType").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }
    try {
      const ticket = await dao.createTicket(req.body.serviceTime);
      return res.status(200).json(ticket);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new ticket: ${err}` });
    }
  }
)

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

