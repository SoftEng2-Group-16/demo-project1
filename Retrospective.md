RETROSPECTIVE (Team 16)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics
Seen the definition of done given, we should consider a total of 0 stories completed, since we didn't do any automated testing; most of our testing was done by hand (with REST extension on VSCode or Postman), so we were sure our code was working as we expected. We will surely implement proper testing procedures for the next project, to better fit the DoD requirements.

We committed to 3 stories, for a total of 6 story points.
The total available time we had as a team was 56 hours (8 hours each), and we were able to put in a total of 43h 35m of real work.


### Detailed statistics

| Story  | Task | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |         |       |            |              |
|      |     OQM11    |    -    |     1h      |       1h 55m       |
|      |     OQM15    |    -    |     3h      |       1h 30m       |
|      |     OQM24    |    -    |     2h      |       45m       |
|      |     OQM23    |    -    |     1h      |       2h 05m       |
|      |     OQM20    |    -    |     30m      |      30m        |
|      |     OQM13    |    -    |     1h      |       1h 05m       |
|      |     OQM12    |    -    |     3h      |       2h 30m       |
|   #1   |         |    2    |           |              |
|      |    OQM17     |        |     1h      |       1h       |
|      |    OQM22     |        |     1h      |       6h 15m       |
|      |    OQM21     |        |     3h      |       1d 3h 25m       |
|    #2  |         |    3    |           |              |
|      |     OQM19    |        |      1h 30m     |      1h        |
|      |     OQM14    |        |      6h     |       1d 1h       |
|      |     OQM16    |        |      1h     |       1h 30m       |
|   #3   |         |     1   |           |              |
|      |    OQM18     |        |     1h      |        3h 05m      |





| | Estimated | Actual |
|--------|------------|--------------|
|Hour per task (average)| 1h 51m | 3h 06m |
|Standard deviation | - |0.061383 |
| Total task estimation error ratio | - | -0.40344 | 

(Note: Total task estimation error ratio -> sum of total hours estimation / sum of total hours spent - 1)


  
## QUALITY MEASURES 

We planned to leave for testing and documentation purposes the hours we had left after completing the development phase. As said in the beginning section, the testing part was not as rigorous as it should have been, so the quality of what we did cannot be considered very high. We know we delivered some working pieces of software, but we are also aware that we need to improve our testing standards to better reflect the given DoD.

- Unit Testing:
  - Total hours estimated : not estimated
  - Total hours spent : 45m
  - Nr of automated unit test cases : 0
  - Coverage (if available) : not available
- E2E testing:
  - Total hours estimated: not estimated
  - Total hours spent: 0h
- Code review 
  - Total hours estimated:  not estimated
  - Total hours spent: 3h 30m (not registered on any task on YouTrack, was done *implicitly*: at least one team member reviewed and approved the code written by another one)


## ASSESSMENT

- Q: What caused your errors in estimation (if any)? 
  - A: Lack of experience with planning, time estimation and task splitting. Also, the lack of communication in the process of assigning tasks

- Q: What lessons did you learn (both positive and negative) in this sprint?
  - A: 
    1. Proper organization and communication are the keys for a good project.
    2. It is easier to work with people we have a good relationship with.
    3. We were too optimistic in evaluating the time needed for each task.

- Q: Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - A: We came up with a list of TODOs we will work on for the next sprint/project:
    1. More detailed testing needs to be done (automated)
    2. More partecipation by team members: not all available working hours were reached
    3. Improve comunication among team members, clarify task assignment (use Telegram chat to report progress and Discord server to help each other or pair programming sessions)
    4. Improve code sharing practices: branches, review code (at least by 2 people) before merging on main branch
    5. Improve the documentation: list of routes and components (client side), list of APIs with request and response types (server side)
    6.  Improve estimation: we were too naive while estimating the time each task would take, and we had too many cross cutting tasks
    7. When presenting, don't show YouTrack boards, maybe prepare a few slides containing a small report on the stories (committed vs completed)

- Q: One thing you are proud of as a Team!!
  - A: We have a good environment among the team members, we always try to identify problems as we go and try to solve them as best as we can. 
