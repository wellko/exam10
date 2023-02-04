import { news } from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {getNews, getNewsById, newNews} from "./newsThunks";


interface Initial {
    news: news[];
    onePage: news | null;
    posting: boolean;
    getting: boolean;
}

const initialState:Initial  = {
    news: [],
    onePage: null,
    posting: false,
    getting: false,
}

export const newsSlice = createSlice({
    name: 'News',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getNews.pending, (state) =>{
            state.getting = true;
        })
        builder.addCase(getNews.fulfilled, (state, action) =>{
            state.news = action.payload;
            state.getting = false;
        })
        builder.addCase(getNews.rejected, (state) =>{
            state.getting = false;
        })
        builder.addCase(getNewsById.pending, (state) =>{
            state.getting = true;
        })
        builder.addCase(getNewsById.fulfilled, (state, action) =>{
            state.onePage = action.payload;
            state.getting = false;
        })
        builder.addCase(getNewsById.rejected, (state) =>{
            state.getting = false;
        })
        builder.addCase(newNews.pending, (state) =>{
            state.posting = true;
        })
        builder.addCase(newNews.fulfilled, (state) =>{
            state.posting = false;
        })
        builder.addCase(newNews.rejected, (state) =>{
            state.posting = false;
        })
    }
})

export const newsReducer = newsSlice.reducer;
export const selectStateOfNews = (state: RootState) => state.news.news;
export const selectStateOfOnePage = (state: RootState) => state.news.onePage;
export const selectStateOfPosting = (state: RootState) => state.news.posting;
export const selectStateOfGetting = (state: RootState) => state.news.getting;
