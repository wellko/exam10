import express from "express";
import mysqlDb from "../mysqlDb";
import {news} from "../types";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const newsData = await connection.query('SELECT * FROM news');
    const response = newsData[0] as news[];
    res.send(response);
});

newsRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const newsData = await connection.query('SELECT * FROM news WHERE id = ?' , [req.params.id]);
    const response = newsData[0] as news[];

    if(response.length < 1) {
        res.status(400).send({error: "can't find news"})
    } else {
        res.send(response[0]);
    }
})

export default newsRouter;