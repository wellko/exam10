import express = require("express");
import cors = require("cors");
import mysqlDb from "./mysqlDb";
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);
app.use(express.static('public'));

const run = async () => {
	await mysqlDb.init();
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(console.error);