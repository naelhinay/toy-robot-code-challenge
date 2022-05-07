const table = {
  maxX: 5,
  maxY: 5,
};
const allowedDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const robotGame = {
  robot: {
    posX: 0,
    posY: 0,
    direction: 'NORTH',
    placed: false,
  },

  place: (x, y, f, cb) => {
    if (!allowedDirections.includes(f)) {
      console.log('Invalid direction, ignoring');
      return cb('Error: invalid direction');
    }

    if (x < 0 || y < 0 || x > table.maxX || y > table.maxY) {
      console.log('Invalid position, ignoring.');
      return cb('Error: invalid position');
    }

    this.robot.posX = x;
    this.robot.poxY = y;
    this.robot.direction = f;
    this.robot.placed = true;

    return cb(null, 'Robot placed');
  },

  move: (cb) => {
    if (!this.robot.placed) {
      console.log('robot not placed');
      return cb('Error: robot not placed');
    }

    let moved = false;
    switch (this.robot.direction) {
      case 'NORTH':
        if (this.robot.posY >= 0 && this.robot.posY < table.maxY) {
          this.robot.posY += 1;
        }
        moved = true;
        break;
      case 'SOUTH':
        if (this.robot.posY <= table.maxY && this.robot.posY > 0) {
          this.robot.posY -= 1;
        }
        moved = true;
        break;
      case 'EAST':
        if (this.robot.posX >= 0 && this.robot.posX < table.maxX) {
          this.robot.posX += 1;
        }
        moved = true;
        break;
      case 'WEST':
        if (this.robot.posX <= table.maxX && this.robot.posX > 0) {
          this.robot.posY -= 1;
        }
        moved = true;
        break;
      default:
        // do nothing;
        break;
    }

    if (!moved) {
      return cb('Error: robot not moved');
    }

    return cb(null, `Robot moved ${this.robot.direction}`);
  },

  left: (cb) => {
    if (!this.robot.placed) {
      console.log('robot not placed');
      return cb('Error: robot not placed');
    }

    const oldDirection = this.robot.direction;
    switch (this.robot.direction) {
      case 'NORTH':
        this.robot.direction = 'WEST';
        break;
      case 'SOUTH':
        this.robot.direction = 'EAST';
        break;
      case 'EAST':
        this.robot.direction = 'NORTH';
        break;
      case 'WEST':
        this.robot.direction = 'SOUTH';
        break;
      default:
        // do nothing;
        break;
    }

    return cb(null, `Robot rotated from ${oldDirection} to ${this.robot.direction}`);
  },

  right: (cb) => {
    if (!this.robot.placed) {
      console.log('robot not placed');
      return cb('Error: robot not placed');
    }

    const oldDirection = this.robot.direction;
    switch (this.robot.direction) {
      case 'NORTH':
        this.robot.direction = 'EAST';
        break;
      case 'SOUTH':
        this.robot.direction = 'WEST';
        break;
      case 'EAST':
        this.robot.direction = 'SOUTH';
        break;
      case 'WEST':
        this.robot.direction = 'NORTH';
        break;
      default:
        // do nothing;
        break;
    }

    return cb(null, `Robot rotated from ${oldDirection} to ${this.robot.direction}`);
  },

  report: (cb) => {
    if (!this.robot.placed) {
      console.log('robot not placed');
      return cb('Error: robot not placed');
    }

    return cb(null, `x: ${this.robot.posX}, y: ${this.robot.posY}, f: ${this.robot.direction}`);
  },
};

export default robotGame;
