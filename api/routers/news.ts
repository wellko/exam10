import express from "express";
import mysqlDb from "../mysqlDb";
import {newsWithOutId, news, newsWithOutText} from "../types";
import {ResultSetHeader} from "mysql2/index";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const newsData = await connection.query('SELECT * FROM news');
    const response = newsData[0] as news[];
    let responseData: newsWithOutText[]= [];
    if (response.length > 0){
        response.map(el => responseData.push({
            title: el.title,
            createdAt: el.createdAt,
            id: el.id,
            image: el.image
        }))
    }
    res.send(responseData);
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
});

newsRouter.delete('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('DELETE FROM news WHERE id = ?', [req.params.id]);
    const resultResponse = result[0] as ResultSetHeader;
    if (resultResponse.affectedRows > 0) {
        res.send('news was deleted')
    } else {
        res.send('cant find news with this id')
    }
})

newsRouter.post('/',imagesUpload.single('image'), async (req, res) => {
    const connection = mysqlDb.getConnection();
    if (!req.body.text || !req.body.title) {
        return res.status(400).send({error: 'all fields required'});
    }
    const postData: newsWithOutId = {
        text: req.body.text,
        title: req.body.title,
        createdAt: new Date(),
        image: req.file?  req.file.filename : null,
    }
    const result = await connection.query(
        'INSERT INTO news (text, title, createdAt, image) VALUES (?, ?, ?, ?)',
        [postData.text, postData.title, postData.createdAt, postData.image])
    const responseInfo = result[0] as ResultSetHeader;
    res.send({...postData, id: responseInfo.insertId})
})

export default newsRouter;