const { actions } = require('./robotGame');
const testData = require('./testData/sample.json');

const cb = (err, resp) => {
  if (err) {
    console.log(err);
  }

  if (!err && resp) {
    console.log(resp);
  }
};

testData.forEach((data) => {
  switch (data.command) {
    case 'MOVE':
      actions.move(cb);
      break;
    case 'LEFT':
      actions.left(cb);
      break;
    case 'RIGHT':
      actions.right(cb);
      break;
    case 'REPORT':
      actions.report(cb);
      break;
    default:
      const { x, y, f, isValid } = actions.checkPlaceCommand(data.command); // eslint-disable-line

      if (isValid) {
        actions.place(x, y, f, cb);
      } else {
        console.log(`${data.command} is not a valid command`);
      }

      break;
  }
});
