# demo-project1
This repository contains all the material related to the 1st Project of the Software Engineering 2 course 2023-24 @PolitecnicoDiTorino


# Getting Started

The root directory of the project "QMS" have two subdirectories (client and server). 
The project must be started by running the two commands: “cd server; nodemon index.js” and “cd client; npm run dev”.
The following material references should contains all the instrections to install all the necessary modules if you don't have them already.


### Some references of the technologies used:
- general: https://elite.polito.it/teaching/01txy-wa1-ah/schedule
- react: https://polito-wa1-aw1-2023.github.io/materials/slide/3-01-React-intro.pdf
- express: https://polito-wa1-aw1-2023.github.io/materials/slide/4-01-Express.pdf


### Some references to other projects based on the same technologies

Insert here any links to your old projects that can be usefull to the current project:

- https://github.com/lfmvit/web-application-airplanes
- https://github.com/aTorredimare/Categories

### To build and run the project:

1) Open two different terminals from vscode (?)
2) (cd client ; npm install; npm run dev) in the first one, this will start up the client
3) (cd server ; npm install; nodemon index.js) in the other one, this will boot up the server listening to the port of the client (NOTE: nodemon should be installed system wide, use `npm install -g nodemon`; if you don't care about server monitoring and just need a quick start, you can run it as a normal JS file with `node index.js`)
