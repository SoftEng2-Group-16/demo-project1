'use strict';

const express = require('express');
const dayjs = require('dayjs');

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
      return res.status(404).json(services);  //{ error: 'No services found'})
    }
    else
      return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//When employee finishes serving tickets, updates the status from pending to closed and adds the timestamp field
//PUT /api/closeticket/:ticketId
//the id of the ticket is passed as a parameter in the url 
app.put("/api/closeticket/:ticketId", async (req, res) => {
  const id = req.params.ticketId;
  const ts = dayjs().format("DD/MM/YYYY HH:mm:ss")

  try {
    const changes = await dao.closeTicket(id,ts);
    return res.status(200).json(changes);
  } catch(err) {
    return res.status(500).json(err.message);
  }
})

//After the next ticket is fetched, when the employee notifies the next customer the ticket is automatically updated 
//with the counterId and the employeeId
//PUT /api/assignticket/:ticketId
app.put('/api/assignticket/:ticketId', async (req, res) => {
  const id = req.params.ticketId;
  const employeeId = req.body.employeeId;
  const counterId = req.body.counterId;

  try{
    const changes = await dao.assignTicket(id,employeeId,counterId);
    return res.status(200).json(changes);
  } catch(err) {
    return res.status(500).json(err.message)
  }
});

//When the employee is ready, he gets the next customer
//The api gets all the tickets associated with services performed by the counter and chooses 
//the one to serve based on the rules given (pick from the longest queue, if same lenght 
//pick the one with smallest service time)
//GET /api/nextcustomer/:counterId
app.get('/api/nextcustomer/:counterId', async (req, res) => {
  const counterId = req.params.counterId;
  let services = [];
  //console.log(counterId);
  try {
    services = await dao.getServicesForCounter(counterId);
    if(services.error){
      return res.status(404).json(services); //{error: 'Error while retrieving services for counter :counterId'}
    }
  } catch(err){
    return res.status(500).json(err.message);
  }

  //create a map with service types as keys and list associated open tickets as values
  const ticketsByService = new Map();
  for (let s of services) {
    await dao.getTicketsForService(s)
      .then(tickets => ticketsByService.set(s, tickets))
      .catch(err => {return res.status(404).json(err.message)})
  }

  //picks the right queue of tickets
  let selectedQueue = [];
  for(const tickets of ticketsByService.values()){
    if(tickets.length > selectedQueue.length){
      selectedQueue = tickets;
    }
    if(tickets.length == selectedQueue.length) {
      const st1 = await dao.getServiceTime(tickets[0].serviceType);
      const st2 = await dao.getServiceTime(selectedQueue[0].serviceType);
      if(st1 < st2) {
        selectedQueue = tickets;
      }
    }
  }

  //from the selected queue, picks the oldest ticket (should be done by timestamp, but since smallest ids mean older
  //records in the table, we pick the entry with the smallest id)
  return res.status(200).json(selectedQueue.reduce( (prev,curr) => prev.id < curr.id ? prev : curr));
})




//Customer choose a service type-> create new ticket
//POST /api/ticket
app.post('/api/ticket',
  [
    check("serviceType").isString(),
    check("status").isString(),
    check("ts").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }
    try {
      const ticket = await dao.createTicket(req.body.serviceType, req.body.ts, req.body.status);
      return res.status(200).json(ticket);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new ticket: ${err}` });
    }
  }
)

//delete a ticket
app.delete("/api/tickets/:id",
  check("id").isInt(),
  async (req, res) => {
    try {
      const result = await dao.deleteTicket(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(503).json({ error: 'Database error during the deletion ' });
    }
  }
);


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

