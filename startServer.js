'use strict';

module.exports = ([ express, logger ]) => (PORT) =>
	express()
		.get('/hello', ({ originalUrl }, res) => {
			logger.info(`new request to ${originalUrl}`);
			return res.send('Hello world')
		})
		.listen(PORT);
