# toy-robot-code-challenge
This game simulates a robot placed on a table.

## Allowed Commands
- `PLACE X,Y,F` where X is the x coordinate, Y is the y coordinate and F the direction
- `MOVE` - will move robot in the direction it's facing. Robot will ignore command if instruction will result in robot falling off the table
- `LEFT` - will rotate robot 90 degrees counter-clockwise.
- `RIGHT` - will rotate robot 90 degrees clockwise.
- `REPORT` - will display current location and direction of the robot

## Test data and other notes
- The application reads data from `testData/sample.json` file. User can modify the file and run `yarn start` to check result of the new commands
- Table setting can be updated in `robotGame.js` file. Unit test might need to be updated if change is made.

## Prerequisites
- Nodejs

## Running the code
If first time running, run `yarn` first to install dependencies

### Commands
- `yarn test` - to run unit tests
- `yarn lint` - to check linting
- `yarn start` - to run app