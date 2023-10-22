## AUTH v.1.0

The authentication it's realized with passport framework, username and password are stored in the database with encrypted passwords and randomly (but manually) generated salt for the time being, since there is no registration process yet.

The Credentials have been generated using https://www.browserling.com/tools/scrypt
and can be tested with its relative counterpart tool https://www.browserling.com/tools/scrypt-check


| username  | password    | role   |
|---        |---          |---|
|  GGeppetto |  password1 |  officer |
|  LVenigni |  password2 | admin  |
|  FGatto    |  password3 | employee  |

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

TODO

*If you need a tool to explore the DB, you can try 'DB Browser for SQLITE' for Windows Desktop*

**Note by LFMV: I removed the constraint NOTNULL on the field Counter (External Key) since only the 'employee' user are bound with counters**
