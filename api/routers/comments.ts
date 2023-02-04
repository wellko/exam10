import express from "express";
import mysqlDb from "../mysqlDb";
import {comments, commentsWithOutID, news} from "../types";
import {ResultSetHeader} from "mysql2";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const newsId = req.query.news_id as string;
    let commentsData;
    if (newsId) {
        commentsData = await connection.query('SELECT * FROM comments WHERE news_id = ?', [newsId]);
    } else {
        commentsData = await connection.query('SELECT * FROM comments');
    }
    const response = commentsData[0] as comments[];
    res.send(response);
});

commentsRouter.delete('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    const resultResponse = result[0] as ResultSetHeader;
    if (resultResponse.affectedRows > 0) {
        res.send('comment was deleted')
    } else {
        res.send('cant find comment with this id')
    }
})

commentsRouter.post('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    if (!req.body.text) {
        return res.status(400).send({error: 'field name required'});
    }
    const news = await connection.query('SELECT * FROM news WHERE id = ?', [req.body.news_id]);
    const newsCheck = news[0] as news[];
    if (newsCheck.length === 0) {
        return res.status(400).send('cant find news');
    }
    const postData: commentsWithOutID = {
        text: req.body.text,
        author: req.body.author ? req.body.author : 'Anonymous',
        news_id: req.body.news_id
    }
    const result = await connection.query(
        'INSERT INTO comments (text, author, news_id) VALUES (?, ?, ?)',
        [postData.text, postData.author, postData.news_id])
    const responseInfo = result[0] as ResultSetHeader;
    res.send({...postData, id: responseInfo.insertId})
})

export default commentsRouter;