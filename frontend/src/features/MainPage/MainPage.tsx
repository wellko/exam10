import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfGetting, selectStateOfNews} from "../News/newsSlice";
import {getNews} from "../News/newsThunks";
import {CircularProgress, Container} from "@mui/material";
import NewsBlock from "../../components/newsBlock/newsBlock";
import {Link} from "react-router-dom";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const News = useAppSelector(selectStateOfNews);
    const getting = useAppSelector(selectStateOfGetting);

    const callBack = useCallback(async () => {
       await dispatch(getNews());
    }, [dispatch])


    useEffect(()=>{
       void callBack();
    }, [callBack])

    return (
        <Container>
            <Link to={'/news/add'}>Create new news</Link>
            {getting? <CircularProgress/>: News.map(el => {
                return <NewsBlock key={Math.random()} props={el}/>
            })}
        </Container>
    );
};

export default MainPage;