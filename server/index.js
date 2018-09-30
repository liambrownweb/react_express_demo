const express = require('express');
const path = require('path');
const {User} = require('./user.js');
const {Article} = require('./article.js');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 4000;

const user_rec = new User();
const article_rec = new Article();
app.use(express.static(path.join(__dirname, '..', 'build/')));
app.use(bodyParser());
// if you need api routes add them here

app.post('/api/:class_name/:action*?/:id*?', (req, res) => {
	let result = "";
	switch (req.params.class_name) {
		case "users":
			result = user_rec[req.params.action](req.body, (data) => res.send(data));
			break;
		case "articles":
			result = article_rec[req.params.action](req.body, (data) => res.send(data));
			break;
		default:
			res.send("Nothing to see here.");
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Check out the app at http://localhost:${PORT}`);
});

