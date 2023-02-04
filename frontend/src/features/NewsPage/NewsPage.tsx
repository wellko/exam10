import React, {useCallback, useEffect} from 'react';
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfGetting, selectStateOfOnePage} from "../News/newsSlice";
import {getNewsById} from "../News/newsThunks";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import CommentForm from "../../components/commentForm/CommentForm";
import {selectCommentsDeleting, selectCommentsGetting, selectCommentsState} from "../Comments/commentsSlice";
import CommentsBlock from "../../components/commentsBlock/CommentsBlock";
import {getComments} from "../Comments/commentsThunks";

const NewsPage = () => {
    const dispatch = useAppDispatch();
    const Info = useAppSelector(selectStateOfOnePage);
    const comments = useAppSelector(selectCommentsState);
    const loading = useAppSelector(selectStateOfGetting);
    const deleting = useAppSelector(selectCommentsDeleting);
    const commentsLoading = useAppSelector(selectCommentsGetting);
    const {id} = useParams();

    const callBack = useCallback(async () => {
        await dispatch(getNewsById(id!));
        await dispatch(getComments(id!));
    }, [dispatch])


    useEffect(() => {
        void callBack();
    }, [callBack])


    return (
        <Container>
            { loading? <CircularProgress/>
                : Info? <Box>
                    <Typography variant='h1'>{Info.title}</Typography>
                    <Typography color='text.secondary'>Created at: {dayjs(Info.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                    <Typography marginTop={3}>{Info.text}</Typography>
                </Box> : <h1>Cant find Page</h1>
            }
            <Typography align="center" variant="h4">Comments</Typography>
            <CommentForm/>
            { commentsLoading? <CircularProgress/> :
                    comments.length > 0? comments.map(el =>
                        <CommentsBlock key={Math.random()} props={el} id={id!} deleting={deleting}/>
                    ) : <h3>no comments yet</h3>
                }
        </Container>
    );
};

export default NewsPage;