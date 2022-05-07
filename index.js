const robotGame = require('./robotGame');
const testData = require('./testData/sample.json');

const cb = (err, resp) => {
  if (err) {
    console.log(err);
  }

  if (!err && resp) {
    console.log(resp);
  }
};

const getValues = (command) => {
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
};

testData.forEach((data) => {
  switch (data.command) {
    case 'MOVE':
      robotGame.actions.move(cb);
      break;
    case 'LEFT':
      robotGame.actions.left(cb);
      break;
    case 'RIGHT':
      robotGame.actions.right(cb);
      break;
    case 'REPORT':
      robotGame.actions.report(cb);
      break;
    default:
      const { x, y, f, isValid } = getValues(data.command); // eslint-disable-line

      if (isValid) {
        robotGame.actions.place(x, y, f, cb);
      } else {
        console.log(`${data.command} is not a valid command`);
      }

      break;
  }
});
