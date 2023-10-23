## API Server

## User
- POST `/api/sessions`
  - Description: request for login
  - Request body:
    - object {username,password}
  - Response: `200 OK` (success)
    - Response body:
      - object user {id,username,name}
  - Response: `401 Unauthorized`
    - response body:
      - {"error":"Incorrect username or password"}

- DELETE `/api/sessions/current`
  - Description: Logout
  - Response: `200 OK` (success) : {}

- GET `/api/sessions/current`
  - Description: Verify if the current user is logged in.
  - Response: `200 OK` (success)
    - Response body: object user
  - Response: `401 Unauthorized`
    - response body {"error":"Not authenticated"}

- POST: save customer serviced
- GET: get next customer to serve

## Customer
- GET `/api/services`
  - Description: get the list of services
  - Response: `200 OK` (success)
    - Response body: list of Service object 
  - Response: `404 Not Found`
    - response body {"error":"No service found"}

- POST `/api/ticket`
  - Description: choose a service type and add the ticket to the table without specifing the counterId and employeeId
  - Response: `200 OK` (success)
    - Response body: number of insert rows, always 1
  - Response: `503 Service Unavailable`
    - response body {"error":"Database error during the creation of new reservation"}

- DELETE `/api/tickets/:id`
  - Description: remove from the table the ticket with the specified ticket id
  - Response: `200 OK` (success)
    - Response body: number of deleted rows, always 1
  - Response: `503 Service Unavailable`
     - response body {"error":"Database error during the delete of ticket",id}


- GET: queue status/waiting time 