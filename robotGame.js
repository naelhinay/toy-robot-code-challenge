const table = {
  maxX: 4, // starts at 0
  maxY: 4, // starts at 0
};
const allowedDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const robot = {
  posX: 0,
  posY: 0,
  direction: 'NORTH',
  placed: false,
};
const actions = {
  place: (x, y, f, cb) => {
    if (!allowedDirections.includes(f)) {
      return cb('PLACE command error, invalid direction');
    }

    if (x < 0 || y < 0 || x > table.maxX || y > table.maxY) {
      return cb('PLACE command error, invalid position');
    }
    robot.posX = x;
    robot.posY = y;
    robot.direction = f;
    robot.placed = true;

    return cb(null);
  },

  move: (cb) => {
    if (!robot.placed) {
      return cb('MOVE command error, robot not placed');
    }

    let moved = false;
    switch (robot.direction) {
      case 'NORTH':
        if (robot.posY >= 0 && robot.posY < table.maxY) {
          robot.posY += 1;
          moved = true;
        }
        break;
      case 'SOUTH':
        if (robot.posY <= table.maxY && robot.posY > 0) {
          robot.posY -= 1;
          moved = true;
        }
        break;
      case 'EAST':
        if (robot.posX >= 0 && robot.posX < table.maxX) {
          robot.posX += 1;
          moved = true;
        }
        break;
      case 'WEST':
        if (robot.posX <= table.maxX && robot.posX > 0) {
          robot.posX -= 1;
          moved = true;
        }
        break;
      default:
        // do nothing;
        break;
    }

    if (!moved) {
      return cb('Falling off the table prevented, robot not moved');
    }

    return cb(null);
  },

  left: (cb) => {
    if (!robot.placed) {
      return cb('LEFT command error, robot not placed');
    }

    switch (robot.direction) {
      case 'NORTH':
        robot.direction = 'WEST';
        break;
      case 'SOUTH':
        robot.direction = 'EAST';
        break;
      case 'EAST':
        robot.direction = 'NORTH';
        break;
      case 'WEST':
        robot.direction = 'SOUTH';
        break;
      default:
        // do nothing;
        break;
    }

    return cb(null);
  },

  right: (cb) => {
    if (!robot.placed) {
      return cb('RIGHT command error, robot not placed');
    }

    switch (robot.direction) {
      case 'NORTH':
        robot.direction = 'EAST';
        break;
      case 'SOUTH':
        robot.direction = 'WEST';
        break;
      case 'EAST':
        robot.direction = 'SOUTH';
        break;
      case 'WEST':
        robot.direction = 'NORTH';
        break;
      default:
        // do nothing;
        break;
    }

    return cb(null);
  },

  report: (cb) => {
    if (!robot.placed) {
      return cb('REPORT command error, robot not placed');
    }

    return cb(null, `Output: ${robot.posX},${robot.posY},${robot.direction}`);
  },

  checkPlaceCommand: (command) => {
    const re = /^PLACE[ ]{1,}[0-4],[0-4],(NORTH|EAST|SOUTH|WEST)[ ]{0,}/g;
    const isValid = re.test(command);

    if (!isValid) {
      return {
        x: null,
        y: null,
        f: null,
        isValid: false,
      };
    }
    const c = command.split(' ');
    const values = c[1].split(',');

    return {
      x: Number(values[0]),
      y: Number(values[1]),
      f: values[2],
      isValid: true,
    };
  },

  removeRobot: () => {
    robot.posX = 0;
    robot.posY = 0;
    robot.placed = false;
  },
};

module.exports = {
  table,
  robot,
  actions,
};
