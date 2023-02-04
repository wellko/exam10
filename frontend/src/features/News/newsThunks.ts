import {createAsyncThunk} from "@reduxjs/toolkit";
import {news, newsPostData} from "../../types";
import axiosApi from "../../axios-api";

export const newNews= createAsyncThunk<void, newsPostData >(
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
      const response = await axiosApi.get('/news');
        return response.data
    })

export const getNewsById = createAsyncThunk<news, string>(
    'news/getById',
    async (arg) => {
       const response =  await axiosApi.get('/news/' + arg)
        return response.data
    }
)

export const deleteNews = createAsyncThunk<void, string>(
    'news/delete',
    async (arg) => {
        await axiosApi.delete('/news/' + arg);
    }
)
