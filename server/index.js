const express = require('express');
const path = require('path');
const {User} = require('./user.js');
const {Article} = require('./article.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'build/')));

// if you need api routes add them here

app.get('/api/:class_name/:action*?/:id*?', (req, res) => {
	let result = "";
	switch (req.params.class_name) {
		case "users":
			let user_rec = new User();
			result = user_rec[req.params.action]();
			break;
		case "articles":
			let article_rec = new Article();
			result = article_rec[req.params.action]();
			break;
		default:
			console.log("Nothing to see here.");
	}
	res.send(result);
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Check out the app at http://localhost:${PORT}`);
});
