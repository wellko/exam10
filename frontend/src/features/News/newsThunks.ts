import {createAsyncThunk} from "@reduxjs/toolkit";
import {news, newsWithOutId} from "../../types";
import axiosApi from "../../axios-api";

export const newNews= createAsyncThunk<void, newsWithOutId >(
    'news/addNew',
    async (arg) => {
        const formData = new FormData();
        formData.append('title', arg.title);
        formData.append('text', arg.text);
        if (arg.image) {
            formData.append('image', arg.image);
        }
        await axiosApi.post('/news', formData);
    }
)

export const getNews = createAsyncThunk<news[]> (
    'news/get',
    async () => {
       return  await axiosApi.get('/news');
    })

export const getNewsById = createAsyncThunk<news, string>(
    'news/getById',
    async (arg) => {
        return await axiosApi.get('/news/' + arg)
    }
)
