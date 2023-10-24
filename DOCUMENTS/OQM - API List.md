## API Server

## User
- POST `/api/sessions`
  - Description: request for login
  - Request body:
    - object {`username`,`password`}
  - Response: `200 OK` (success)
    - Response body:
      - object user {`id`,`username`,`name`}
  - Response: `401 Unauthorized`
    - response body:
      - {`error`:"Incorrect username or password"}

- DELETE `/api/sessions/current`
  - Description: Logout
  - Response: `200 OK` (success) : {}

- GET `/api/sessions/current`
  - Description: Verify if the current user is logged in.
  - Response: `200 OK` (success)
    - Response body: object user
  - Response: `401 Unauthorized`
    - response body {`error`:"Not authenticated"}

- PUT: `/api/closeticket/:ticketId`
  - Description: closes the ticket when the customer is served (change ticket status to closed and adds closing timestamp)
  - Response: `200 OK` (success)
    - Response body:  contains the number of changes made (should be 1, just one row is updated)
  - Response: `500 Internal Server Error` (failure) when an error is encountered

- PUT: `/api/assignticket/:ticketId`
  - Description: updates the ticket selected from the queue with the counterId and the employeeId
  - Request body: object containing counterId and employeeId to assign the ticket to -> {`counterId`, `employeeId`}
  - Response: `200 OK` (success)
    - Response body:  contains the number of changes made (should be 1, just one row is updated)
  - Response: `500 Internal Server Error` (failure) when an error is encountered
  
- GET: `/api/nextcustomer/:counterId`
  - Description: gets next ticket to serve, picking it from the queue of services performed by the counter with the given id
  - Response: `200 OK` (success)
    - Response body: contains the selected ticket -> {`id`, `counterId`, `timestampCreated`, `timestampFinished`, `serviceType`, `employeeId`, `status`}

      Note: `timestampFinished`, `counterId` and `employeeId` will be empty or null since the ticket has not been assigned yet, only fetched; ticketStatus will be set to `pending` since the ticket has yet to be served.
  - Response: `404 Not found` (failure), retuned if retrieval of tickets in queue or if retrieval of services for the counter fails

    Note: could also mean empty queue! Needs to be tested more comprehensively
  - Response: `500 Internal Server Error` (failure), general server error 


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
    - Response body: id of the ticket has been created
  - Response: `503 Service Unavailable`
    - response body {"error":"Database error during the creation of new reservation"}

- DELETE `/api/tickets/:id`
  - Description: remove from the table the ticket with the specified ticket id
  - Response: `200 OK` (success)
    - Response body: number of deleted rows, always 1
  - Response: `503 Service Unavailable`
     - response body {"error":"Database error during the delete of ticket",id}

## Utility functions
### `getJson(httpResponsePromise)`
- **Description**: A utility function for parsing HTTP responses.
- **Parameters**:
  - `httpResponsePromise` (Promise) - A promise representing the HTTP response.

- **Returns**:
  - A Promise that resolves with the parsed JSON response or rejects with an error message.

- **Behavior**:
  - If the HTTP response is successful parse the JSON response and resolve the promise with the parsed JSON.
  - If the response is not successful attempt to parse the response body to extract an error message and reject the promise with the error message.
  - If there's an error in making the HTTP request (e.g., a network issue), reject the promise with a "Cannot communicate" error message.
  
  

This utility function is helpful when working with API requests, ensuring that you can handle HTTP responses in a consistent manner, whether they represent success or errors.
