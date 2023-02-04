import { comments } from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {deleteComment, getComments, newComment} from "./commentsThunks";

interface Initial {
    comments: comments[];
    posting: boolean;
    deleting: boolean;
    getting: boolean;
}

const initialState: Initial = {
    comments: [],
    posting: false,
    deleting: false,
    getting: false,
}

export const commentsSlice = createSlice(
    {
        name: 'Comments',
        initialState,
        reducers: {},
        extraReducers: (builder) =>{
            builder.addCase(newComment.pending, (state) => {
                state.posting = true;
            })
            builder.addCase(newComment.fulfilled, (state) => {
                state.posting = false;
            })
            builder.addCase(newComment.rejected, (state) => {
                state.posting = false;
            })

            builder.addCase(deleteComment.pending, (state) => {
                state.deleting = true;
            })
            builder.addCase(deleteComment.fulfilled, (state) => {
                state.deleting = false;
            })
            builder.addCase(deleteComment.rejected, (state) => {
                state.deleting = false;
            })

            builder.addCase(getComments.pending, (state) => {
                state.getting = true;
            })
            builder.addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.getting = false;
            })
            builder.addCase(getComments.rejected, (state) => {
                state.getting = false;
            })
        }
    }
)

export const commentsReducer = commentsSlice.reducer;
export const selectCommentsAction = (state: RootState) => state.comments.posting;