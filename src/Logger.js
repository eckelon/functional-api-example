'use strict';

const { attempt, fork } = require('fluture');

const noop = () => {};

module.exports = () => {
  const logger = require('pino')();
  const run = fork(console.error)(noop);
  const info = (msg) => run(attempt(() => logger.info(msg)));
  const error = (msg) => run(attempt(() => logger.error(msg)));
  return { info, error };
};
