import {createAsyncThunk} from "@reduxjs/toolkit";
import {comments, commentsWithOutID} from "../../types";
import axiosApi from "../../axios-api";

export const newComment= createAsyncThunk<void, commentsWithOutID >(
    'comments/addNew',
    async (arg) => {
        const PostData = {
            author: arg.author,
            text: arg.text,
            news_id: arg.news_id,
        }
        await axiosApi.post('/comments', PostData);
    }
)

export const getComments = createAsyncThunk<comments[], string> (
    'comments/get',
    async (arg) => {
        const response = await axiosApi.get('/comments?news_id=' + arg);
        return response.data
    })


export const deleteComment = createAsyncThunk<void, string>(
    'comments/delete',
    async (arg) => {
        await axiosApi.delete('/comments/' + arg);
    }
)