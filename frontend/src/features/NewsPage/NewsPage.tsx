import React, {useCallback, useEffect} from 'react';
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfGetting, selectStateOfOnePage} from "../News/newsSlice";
import {getNewsById} from "../News/newsThunks";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";

const NewsPage = () => {
    const dispatch = useAppDispatch();
    const Info = useAppSelector(selectStateOfOnePage);
    const loading = useAppSelector(selectStateOfGetting);
    const {id} = useParams();

    const callBack = useCallback(async () => {
        await dispatch(getNewsById(id!));
    }, [dispatch])


    useEffect(() => {
        void callBack();
    }, [callBack])


    return (
        <Container>
            {Info?loading? <CircularProgress/>
                : <Box>
                    <Typography>{Info.title}</Typography>
                    <Typography>Created at: {dayjs(Info.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                    <Typography>{Info.text}</Typography>
                </Box> : <h1>Cant find Page</h1>
            }
        </Container>
    );
};

export default NewsPage;