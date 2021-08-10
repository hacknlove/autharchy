const send = require('./send');

const steps = [
  require('./match'),
  require('../../../shared/pre'),
  require('../../../shared/cached'),
  require('./proxy'),
  require('./recorder'),
  require('../../../shared/post'),
];


module.exports = async function graphqlHandler(req, res) {
  let context = req

  for (const step of steps) {
    context = await step(context)
    if (context.response) {
      return send(res, context)
    }
  }

  send(res, context)
};
