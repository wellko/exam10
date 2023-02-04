import { news } from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";


interface Initial {
    news: news[];
    posting: boolean;
    getting: boolean;
}

const initialState:Initial  = {
    news: [],
    posting: false,
    getting: false,
}

export const newsSlice = createSlice({
    name: 'News',
    initialState,
    reducers: {},
})

export const newsReducer = newsSlice.reducer;
export const selectState = (state: RootState) => state.news.news;