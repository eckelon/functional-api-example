'use strict';

const PORT = process.env.PORT || 3000;
const startServer = require('./startServer');
const getLogger = require('./Logger');
const { fork, attempt } = require('fluture');
const { acquire, hookAll, runHook } = require('fluture-hooks');

const withDependencies = runHook(hookAll([
  acquire(attempt(() => require('express')))
  , acquire(attempt(getLogger))
]));

fork
(console.error)
(() => console.log(`server started in http://localhost:${PORT}`))
(withDependencies((dependencies) => attempt(() => startServer(dependencies)(PORT))));
