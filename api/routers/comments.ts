import express from "express";
import mysqlDb from "../mysqlDb";
import {comments} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const newsId = req.query.news_id as string;
    let commentsData;
    if(newsId) {
        commentsData = await connection.query('SELECT * FROM comments WHERE news_id = ?', [newsId]);
    } else {
        commentsData = await connection.query('SELECT * FROM comments');
    }
    const response = commentsData[0] as comments[];
    res.send(response);
})

export default commentsRouter;