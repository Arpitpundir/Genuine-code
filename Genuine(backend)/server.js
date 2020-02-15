const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")

//SMD
// process.on('uncaughtException', (err) => {
// 	console.log('UNCAUGHT EXCEPTION! Shutting down...');
// 	console.log(err.name, err.message);
// 	process.exit(1);
// });

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

//smd
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindIndex: true
	})
	.then(() => console.log('DB connection successfull!'));

const port = process.env.port || 3000;
const server = app.listen(port, () => {
	console.log("App started on port ", port);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION!  Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
