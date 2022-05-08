/* eslint-disable no-undef */
const { table, robot, actions } = require('../robotGame');

describe('PLACE command', () => {
  afterEach(() => actions.removeRobot());

  test('- returns an error when direction is invalid', () => {
    const cb = (err) => {
      expect(err).toBe('Error: invalid direction');
    };

    actions.place(1, 1, 'INVALID DIRECTION', cb);
  });

  test('- returns an error when x is invalid', () => {
    const cb = (err) => {
      expect(err).toBe('Error: invalid position');
    };

    actions.place(1, 5, 'NORTH', cb);
  });

  test('- returns an error when y is invalid', () => {
    const cb = (err) => {
      expect(err).toBe('Error: invalid position');
    };

    actions.place(5, 1, 'NORTH', cb);
  });

  test('+ place robot on table when params are correct', () => {
    const cb = (err) => {
      expect(err).toBeNull();
      expect(robot).toBeDefined();
      expect(robot.posX).toBe(1);
      expect(robot.posY).toBe(1);
      expect(robot.direction).toBe('NORTH');
      expect(robot.placed).toBeTruthy();
    };

    actions.place(1, 1, 'NORTH', cb);
  });
});

describe('LEFT command', () => {
  describe('- When robot is not placed', () => {
    afterEach(() => actions.removeRobot());
    test('- returns an error `robot not placed`', () => {
      const cb = (err) => {
        expect(err).toBe('Error: robot not placed');
      };

      actions.left(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'NORTH', () => {}));
    afterEach(() => actions.removeRobot());
    test('+ will change from NORTH to WEST', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('WEST');
      };

      actions.left(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'WEST', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from WEST to SOUTH', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('SOUTH');
      };

      actions.left(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'SOUTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from SOUTH to EAST', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('EAST');
      };

      actions.left(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'EAST', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from EAST to NORTH', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('NORTH');
      };

      actions.left(cb);
    });
  });
});

describe('RIGHT command', () => {
  describe('- When robot is not placed', () => {
    afterEach(() => actions.removeRobot());

    test('- returns an error `robot not placed`', () => {
      const cb = (err) => {
        expect(err).toBe('Error: robot not placed');
      };

      actions.right(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'NORTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from NORTH to EAST', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('EAST');
      };

      actions.right(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'EAST', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from EAST to SOUTH', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('SOUTH');
      };

      actions.right(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'SOUTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from SOUTH to WEST', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('WEST');
      };

      actions.right(cb);
    });
  });

  describe('Change direction when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'WEST', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will change from WEST to NORTH', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('NORTH');
      };

      actions.right(cb);
    });
  });
});

describe('MOVE command', () => {
  describe('- When robot is not placed', () => {
    afterEach(() => actions.removeRobot());

    test('- returns an error `robot not placed`', () => {
      const cb = (err) => {
        expect(err).toBe('Error: robot not placed');
      };

      actions.move(cb);
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => actions.place(0, 0, 'WEST', () => {}));
    afterEach(() => actions.removeRobot());

    test('- will not move, when x = 0 and facing WEST', () => {
      const cb = (err) => {
        expect(err).toBeFalsy();
        expect(robot.posX).toBe(0);
        expect(robot.direction).toBe('WEST');
      };

      actions.move(cb);
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => actions.place(0, 0, 'SOUTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('- will not move, when y = 0 and facing SOUTH', () => {
      const cb = (err) => {
        expect(err).toBeFalsy();
        expect(robot.posY).toBe(0);
        expect(robot.direction).toBe('SOUTH');
      };

      actions.move(cb);
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => actions.place(0, table.maxY, 'NORTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('- will not move, when y = maxValue and facing NORTH', () => {
      const cb = (err) => {
        expect(err).toBeFalsy();
        expect(robot.posY).toBe(table.maxY);
        expect(robot.direction).toBe('NORTH');
      };

      actions.move(cb);
    });
  });

  describe('- When robot is placed', () => {
    beforeEach(() => actions.place(table.maxX, 0, 'EAST', () => {}));
    afterEach(() => actions.removeRobot());

    test('- will not move, when x = maxValue and facing EAST', () => {
      const cb = (err) => {
        expect(err).toBeFalsy();
        expect(robot.posX).toBe(table.maxX);
        expect(robot.direction).toBe('EAST');
      };

      actions.move(cb);
    });
  });

  describe('Move forward when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'NORTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will move NORTH one step from 1,1 to 1,2', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('NORTH');
        expect(robot.posX).toBe(1);
        expect(robot.posY).toBe(2);
      };

      actions.move(cb);
    });
  });

  describe('Move forward when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'SOUTH', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will move SOUTH one step from 1,1 to 1,0', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('SOUTH');
        expect(robot.posX).toBe(1);
        expect(robot.posY).toBe(0);
      };

      actions.move(cb);
    });
  });

  describe('Move forward when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'EAST', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will move EAST one step from 1,1 to 2,1', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('EAST');
        expect(robot.posX).toBe(2);
        expect(robot.posY).toBe(1);
      };

      actions.move(cb);
    });
  });
  describe('Move forward when robot is already placed', () => {
    beforeEach(() => actions.place(1, 1, 'WEST', () => {}));
    afterEach(() => actions.removeRobot());

    test('+ will move WEST one step, from 1,1 to 0,1', () => {
      const cb = (err) => {
        expect(err).toBeNull();
        expect(robot.direction).toBe('WEST');
        expect(robot.posX).toBe(0);
        expect(robot.posY).toBe(1);
      };

      actions.move(cb);
    });
  });
});

describe('REMOVE robot', () => {
  beforeEach(() => actions.removeRobot());

  test('+ will set placed as false', () => {
    expect(robot.placed).toBeFalsy();
  });
});

describe('Check PLACE command format', () => {
  test('- will return command is invalid if direction is invalid', () => {
    const res = actions.checkPlaceCommand('PLACE 1,4,INVALID DIRECTION');

    expect(res.isValid).toBeFalsy();
  });

  test('- will return command is invalid if x > max', () => {
    const res = actions.checkPlaceCommand('PLACE 5,1,NORTH');

    expect(res.isValid).toBeFalsy();
  });

  test('- will return command is invalid if y > max', () => {
    const res = actions.checkPlaceCommand('PLACE 1,5,NORTH');

    expect(res.isValid).toBeFalsy();
  });

  test('- will return command is invalid pattern is invalid', () => {
    const res = actions.checkPlaceCommand('PLACExxx,NORTH');

    expect(res.isValid).toBeFalsy();
  });

  test('+ will return separated values from command if valid', () => {
    const res = actions.checkPlaceCommand('PLACE 1,4,NORTH');

    expect(res.isValid).toBeTruthy();
    expect(res.x).toBe(1);
    expect(res.y).toBe(4);
    expect(res.f).toBe('NORTH');
  });
});
