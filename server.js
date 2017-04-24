const express = require('express'),
	app = express(),
	port = process.env.PORT || 8080;

app.use('/', (req, res) => {
	res.send('Cest la route !!!!');
})

.listen(port, (req, res) => {
	console.log('Server is Ok. Listening port ', port);
});
