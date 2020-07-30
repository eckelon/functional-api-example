'use strict';

const PORT = process.env.PORT || 3000;
const startServer = require('./startServer');
const { fork, attempt } = require('fluture');
const { acquire, hookAll, runHook } = require('fluture-hooks');

const withDependencies = runHook(hookAll([
	acquire(attempt(() => require('express')))
	, acquire(attempt(() => require('pino')()))
]));

fork
(console.error)
(() => console.log(`server started in http://localhost:${PORT}`))
(withDependencies((dependencies) => attempt(() => startServer(dependencies)(PORT))));
