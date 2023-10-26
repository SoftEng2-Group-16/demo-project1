## AUTH v.1.0

The authentication it's realized with passport framework, username and password are stored in the database with encrypted passwords and randomly (but manually) generated salt for the time being, since there is no registration process yet.

The Credentials have been generated using https://www.browserling.com/tools/scrypt
and can be tested with its relative counterpart tool https://www.browserling.com/tools/scrypt-check


| username  | password    | role   |
|---        |---          |---|
|  GGeppetto |  password1 |  office_manager |
|  LVenigni |  password2 | system_manager  |
|  FGatto    |  password3 | employee  |
| MRossi | password3 | employee  |
| LVerdi | password3 | employee  |

### SESSIONS

The session is currently initialized with all the data related to the user that is been serialized.
```
{
  id: 1,
  firstname: 'Giuseppe',
  lastname: 'Geppetto',
  counter: null,
  username: 'GGeppetto',
  password: '953192f7f990e0bd0eb45e79383eb6dd5e053ff3e815c470b1fe8683f66962aaf6b438beb02230a7ea1cb22176bdd4c4b8e70764d7adf56f582f0e071dd779c8',
  salt: 'e8a1ea50eeaaa38f',
  role: 'officer'
}
```

This is **WRONG** and needs to be fixed, the serialization should not invlude sensitive information, but only name surname username and role.

## Database Structure

COUNTERS
| id  | services  | service_time
|---        |---  |---
1     | shipping,booking | t1
2     | account   | t2
3     | shipping,account |t3

The services field is a string, we need a function to transform the json to a string 
Service_time is the avarage time for the service, to use in the formula

SERVICES
| id  | type   | desciption
|---        |--- | ---
1     | account | info
2     | shipping | info
3     | booking | info

TICKETS
| id |counterId | ts_created | ts_finished | service_type | employeeid |status
|---        |--- | --- |--- |--- |--- |---


status is pending if there is no counter available for the requested service and so the customer is in the queue, is also pending during the time he is being served.
A first update is done when the system assign the counter and the employeeid.
A final update is done once the customer has been served updating the ts_finished and putting the status to Closed


*If you need a tool to explore the DB, you can try 'DB Browser for SQLITE' for Windows Desktop*


## Useful ideas and future development needs

**Note by LFMV: I removed the constraint NOTNULL on the field Counter (External Key) since only the 'employee' user are bound with counters**

### Done
**Idea for the main board**: we should add another possible state for the ticket (passing from `pending`/`closed` to something like `opened`/`assigned`/`closed`). In this way:
  - When the ticket is created, the default status is `opened` (need to modify the opening API)
  - When the ticket is assigned to an employee/counter, the status goes to `assigned` (need to modify the assign ticket API)
  - When the ticket is finished, the status goes to `closed` (need to modify the close ticket API)
  - To populate the board on the homepage, we simply need to add a GET API which provides all the rows in the ticket table  with the status set to assigned (should be as many as the number of counters, maybe less if a counter has closed its last ticket and is waiting to call the next customer, **never** more)

### TODO
We shoud add a timestamp_started to the ticket, so it's easier to identify the most recent served ticket