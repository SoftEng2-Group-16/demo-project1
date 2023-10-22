## AUTH v.1.0

The authentication it's realized with passport framework, username and password are stored in the database with encrypted passwords and randomly (but manually) generated salt for the time being, since there is no registration process yet.

The Credentials have been generated using https://www.browserling.com/tools/scrypt
and can be tested with its relative counterpart tool https://www.browserling.com/tools/scrypt-check


| username  | password    | role   |
|---        |---          |---|
|  GGeppetto |  password1 |  officer |
|  LVenigni |  password2 | admin  |
|  FGatto    |  password3 | employee  |

## Database Structure

TODO

*If you need a tool to explore the DB, you can try 'DB Browser for SQLITE' for Windows Desktop*

**Note by LFMV: I removed the constraint NOTNULL on the field Counter (External Key) since only the 'employee' user are bound with counters**
