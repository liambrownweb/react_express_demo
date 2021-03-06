const express = require('express');
const sqlite = require('sqlite');
const path = require('path');
const {User} = require('./user.js');
const {Article} = require('./article.js');
const {Share} = require('./share.js');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 4000;

var share_rec, user_rec, article_rec;

sqlite.open('./database.sqlite')
	.then((db) => {
	share_rec = new Share(db);
	user_rec = new User();
	article_rec = new Article(db);
});

app.use(express.static(path.join(__dirname, '..', 'build/')));
app.use(bodyParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

