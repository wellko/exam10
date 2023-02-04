import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {commentsWithOutID} from "../../types";
import {Box, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useParams} from "react-router-dom";
import {selectCommentsPosting} from "../../features/Comments/commentsSlice";
import {getComments, newComment} from "../../features/Comments/commentsThunks";

const CommentForm = () => {
    const dispatch = useAppDispatch();
    const posting = useAppSelector(selectCommentsPosting);
    const {id} = useParams();

    const initialState:commentsWithOutID = {
        author: '',
        news_id: id!,
        text: '',
    }
    const [post, setPost] = useState<commentsWithOutID>(initialState)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPost(prev => ({...prev, [name]: value}));
    };

    const postData = async (e:React.FormEvent) => {
        e.preventDefault();
        await dispatch(newComment(post));
        setPost(initialState);
        await dispatch(getComments(id!));
    }

    return (
        <Box border={2} borderRadius={2} borderColor='#000' sx={{ bgcolor: '#FFF' }} marginBottom={3}>
            <form onSubmit={postData}>
                <TextField name='author' fullWidth label="Author: " id="fullWidth" onChange={onChange} value={post.author}
                           margin='normal'/>
                <TextField name='text' required fullWidth label="Message: " id="fullWidth" onChange={onChange} value={post.text}
                           margin='normal'/>
                <LoadingButton loading={posting} type='submit' variant='contained'>Comment</LoadingButton>
            </form>
        </Box>
    );
};

export default CommentForm;