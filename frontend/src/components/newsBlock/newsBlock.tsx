import React from 'react';
import {news} from "../../types";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../constants";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {deleteNews, getNews} from "../../features/News/newsThunks";

interface Props {
    props: news;
}

const NewsBlock:React.FC<Props>= ({props}) => {
    const dispatch = useAppDispatch();

    const onDelete = async () => {
       await dispatch(deleteNews(props.id));
       await dispatch(getNews());
    }

    const ImageUrl = apiUrl + '/images/' + props.image;

    const date = dayjs(props.createdAt).format('YYYY-MM-DD HH:mm:ss')
    return (
            <Box>
                <Card>
                    {props.image ? <CardMedia
                        component="img"
                        image={ImageUrl}
                        title={props.image}
                    />: null}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <br/> <b>{props.title}</b>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>created at:</b> <br/> {date}
                        </Typography>
                        <Link to={'/news/' + props.id}>Watch more. . .</Link>
                        <Button onClick={onDelete}> Delete</Button>
                    </CardContent>
                </Card>
            </Box>

    );
};

export default NewsBlock;