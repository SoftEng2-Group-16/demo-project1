/* eslint-disable no-unused-vars */
const SERVER_URL = 'http://localhost:3001';

import { Service,Counter,Ticket,getCurrentTimestamp } from "./model";


const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}



//CUSTOMER
async function getAllServices() {
  return getJson(fetch(SERVER_URL + '/api/services'))
    .then(json => {
      return json.map((service) => new Service(service.id, service.type,service.description,service.serviveTime))
    });

}

async function createNewTicket(serviceType) {
  const ts = getCurrentTimestamp();
  const status = "opened";
  const ticket = {
    "serviceType": serviceType,
    "ts": ts,
    "status": status
  };

  return getJson(
    fetch(SERVER_URL + '/api/ticket', {
      method: 'POST',
      body: JSON.stringify(ticket),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
}

async function getServicingTickets() {
  return getJson(
    fetch(SERVER_URL + '/api/pendingtickets'), {
      method:'GET'
    }
  );
}


async function getServicesForCounter(counterId) {
  return getJson(fetch(SERVER_URL +  `/api/services/${counterId}`))
    .then(json => {
      return json.map((service) => new Service(service.id, service.type,service.description,service.serviveTime))
    });

}


//EMPLOYEE
async function closeTicket(ticketId) {
  return getJson(
    fetch( (SERVER_URL + `/api/closeticket/${ticketId}`), {
      method:'PUT',
      //credentials: 'include' commented for testing, in real app only authenticated employees can call this API
    })
  );
}

async function getNextTicketToServe(counterId) {
  return getJson( 
    fetch(SERVER_URL + `/api/nextcustomer/${counterId}`), {
      method: 'GET',
      //credentials: 'include' commented for testing, to evaluate if decomment it or not
    });
}

async function assignTicket(ticketId, employeeId, counterId) {
  const counterData = {
    "employeeId": employeeId,
    "counterId": counterId
  };
  return getJson(
    fetch( (SERVER_URL + `/api/assignticket/${ticketId}`), {
      method: 'PUT',
      //credentials: 'include', commented for testing, in real app only authenticated employees can modify the ticket
      body: JSON.stringify(counterData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  );
}
/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> } 
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
          // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
          response.json()
            .then(json => resolve(json))
            .catch(err => reject({ error: "Cannot parse server response" }))

        } else {
          // analyzing the cause of error
          response.json()
            .then(obj =>
              reject(obj)
            ) // error msg in the response body
            .catch(err => reject({ error: "Cannot parse server response" })) // something else
        }
      })
      .catch(err =>
        reject({ error: "Cannot communicate" })
      ) // connection error
  });
}


const API = { logIn, logOut, getUserInfo, getAllServices, createNewTicket, closeTicket,
   getNextTicketToServe, assignTicket, getServicingTickets,getServicesForCounter };
export default API;